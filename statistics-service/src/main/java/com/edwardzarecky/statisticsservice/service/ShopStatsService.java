package com.edwardzarecky.statisticsservice.service;

import com.edwardzarecky.statisticsservice.dto.BookDto;
import com.edwardzarecky.statisticsservice.dto.CustomMessage;
import com.edwardzarecky.statisticsservice.dto.ShopStatsDto;
import com.edwardzarecky.statisticsservice.entity.ShopStats;
import com.edwardzarecky.statisticsservice.repository.ShopStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

import static com.edwardzarecky.statisticsservice.service.CustomerStatsService.BOOK_SERVICE_API;

/**
 * @author Edward Zářecký
 */

//Služba představující logiku aplikace, public metody se volají z ShopStatsController
//dotazy do databáze jsou prováděny skrze používání ShopStatsRepository

@Service
@RequiredArgsConstructor
public class ShopStatsService {

    private final ShopStatsRepository shopStatsRepository;

    private final RestTemplate restTemplate;

    public List<ShopStats> findAll() {
        return shopStatsRepository.findAll();
    }

    //Metoda sloužící pro načtení detailu knih z book-service dle bookId v entitě ShopStats
    //vrací List<ShopStatsDto> s detailem
    public List<ShopStatsDto> findAllShopStatsDto() {
        List<ShopStats> shopStatsList = findAll();
        List<ShopStatsDto> allShopStatsDto = new ArrayList<>();

        shopStatsList.forEach(it -> {
            ShopStatsDto dto = new ShopStatsDto();
            ShopStats shopStats = findById(it.getBookId());

            BookDto bookDto = restTemplate.getForObject(BOOK_SERVICE_API + shopStats.getBookId(), BookDto.class);

            dto.setShopStats(shopStats);
            dto.setBookDto(bookDto);

            allShopStatsDto.add(dto);
        });

        return allShopStatsDto;
    }

    public List<ShopStats> mapToShopStats(CustomMessage customMessage) {
        List<ShopStats> shopStatsList = new ArrayList<>();

        if (!customMessage.getBookIds().isEmpty()) {
            customMessage.getBookIds().forEach(it -> {
                ShopStats shopStats = new ShopStats();
                shopStats.setBookId(it);
                shopStatsList.add(shopStats);
            });
        }
        return shopStatsList;
    }

    //Při odebrání knihy z obchodu se v databázi odečte číslo jedna z salesPoints
    //Pokud žádný jiný obchod nenabízí tuto knihu, tak se odstraní ze statistik
    public void deleteShopStats(List<ShopStats> shopStatsList) {
        shopStatsList.forEach(it -> {
            ShopStats temp = findById(it.getBookId());
            if (temp != null) {
                it.setSalesPoints(temp.getSalesPoints() - 1);
                if (it.getSalesPoints() == 0) {
                    deleteShopsStatsById(it.getBookId());
                } else {
                    shopStatsRepository.save(it);
                }
            }
        });
    }

    //Při přidání knihy do obchodu se v databázi přičte číslo jedna do salesPoints
    public void saveShopStats(List<ShopStats> shopStatsList) {
        shopStatsList.forEach(it -> {
            ShopStats temp = findById(it.getBookId());
            if (temp != null) {
                it.setSalesPoints(temp.getSalesPoints() + 1);
                shopStatsRepository.save(it);
            } else {
                ShopStats shopStats = new ShopStats();
                shopStats.setBookId(it.getBookId());
                shopStats.setSalesPoints(1);
                shopStatsRepository.save(shopStats);
            }
        });
    }

    private void deleteShopsStatsById(Long bookId) {
        shopStatsRepository.deleteById(bookId);
    }

    private ShopStats findById(Long bookId) {
        return shopStatsRepository.findById(bookId).orElse(null);
    }
}
