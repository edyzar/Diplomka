package com.edwardzarecky.bookservice.service;

import com.edwardzarecky.bookservice.entity.Book;
import com.edwardzarecky.bookservice.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Edward Zářecký
 * */

//Služba představující logiku aplikace, public metody se volají z BookControlleru
//dotazy do databáze jsou prováděny skrze používání BookRepository
@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public Book findBookById(Long bookId) {
        return bookRepository.findById(bookId).orElse(null);
    }
    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    public void deleteBookById(Long bookId) {
        bookRepository.deleteById(bookId);
    }

}
