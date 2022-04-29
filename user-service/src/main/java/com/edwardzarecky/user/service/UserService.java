package com.edwardzarecky.user.service;

import com.edwardzarecky.user.dto.BookDto;
import com.edwardzarecky.user.dto.UserDto;
import com.edwardzarecky.user.dto.CustomMessage;
import com.edwardzarecky.user.entity.User;
import com.edwardzarecky.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Edward Zářecký
 */

//Služba představující logiku aplikace, public metody se volají z UserControlleru
//dotazy do databáze jsou prováděny skrze používání UserRepository

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final RestTemplate restTemplate;

    public static final String BOOK_SERVICE_API = "http://book-service/v1/book/";

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User findUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }

    //Metoda sloužící pro načtení detailu knih z book-service dle bookId u zákazníka
    public UserDto userWithBooksDetail(Long userId) {
        UserDto dto = new UserDto();
        User user = findUserById(userId);

        List<BookDto> booksList = new ArrayList<>();

        user.getBookIds().forEach(bookId -> {
            booksList.add(restTemplate.getForObject(BOOK_SERVICE_API + bookId, BookDto.class));
        });

        dto.setUser(user);
        dto.setBookDtos(booksList);

        return dto;
    }

    //Metoda pro nasetování CustomMessage pro RabbitMQ
    public CustomMessage mapToCustomMessage(User user, boolean isDeleted, boolean isShop) {
        CustomMessage customMessage = new CustomMessage();
        customMessage.setBookIds(user.getBookIds());
        customMessage.setIsDeleted(isDeleted);
        customMessage.setIsShop(isShop);
        return customMessage;
    }

}

