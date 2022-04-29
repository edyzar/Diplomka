package com.edwardzarecky.shopservice.service;

import com.edwardzarecky.shopservice.dto.BookDto;
import com.edwardzarecky.shopservice.dto.CustomMessage;
import com.edwardzarecky.shopservice.dto.ShopDto;
import com.edwardzarecky.shopservice.entity.Shop;
import com.edwardzarecky.shopservice.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Edward Zářecký
 */

//Služba představující logiku aplikace, public metody se volají z ShopController
//dotazy do databáze jsou prováděny skrze používání ShopRepository
@Service
@RequiredArgsConstructor
public class ShopService {

    private final ShopRepository shopRepository;

    private final RestTemplate restTemplate;

    public static final String BOOK_SERVICE_API = "http://book-service/v1/book/";

    public Shop saveShop(Shop shop) {
        return shopRepository.save(shop);
    }

    public Shop findShopById(Long shopId) {
        return shopRepository.findById(shopId).orElse(null);
    }

    public List<Shop> findAllShops() {
        return shopRepository.findAll();
    }

    public void deleteShopById(Long shopId) {
        shopRepository.deleteById(shopId);
    }

    //Metoda sloužící pro načtení detailu knih z book-service dle bookId u obchodu
    public ShopDto shopWithBooksDetail(Long shopId) {
        ShopDto dto = new ShopDto();
        Shop shop = findShopById(shopId);

        List<BookDto> booksList = new ArrayList<>();

        shop.getBookIds().forEach(bookId -> {
            booksList.add(restTemplate.getForObject(BOOK_SERVICE_API + bookId, BookDto.class));
        });

        dto.setShop(shop);
        dto.setBookDtos(booksList);

        return dto;
    }

    //Metoda pro nasetování CustomMessage pro RabbitMQ
    public CustomMessage mapToCustomMessage(Shop shop, boolean isDeleted, boolean isShop) {
        CustomMessage customMessage = new CustomMessage();
        customMessage.setBookIds(shop.getBookIds());
        customMessage.setIsDeleted(isDeleted);
        customMessage.setIsShop(isShop);
        return customMessage;
    }

}
