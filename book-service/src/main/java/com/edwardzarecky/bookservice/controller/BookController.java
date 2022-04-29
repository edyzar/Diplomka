package com.edwardzarecky.bookservice.controller;

import com.edwardzarecky.bookservice.entity.Book;
import com.edwardzarecky.bookservice.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Edward Zářecký
 */

//Kontroler pro práci se knihami

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/book")
public class BookController {

    private final BookService bookService;

    @PostMapping("/")
    public Book saveBook(@RequestBody Book Book) {
        return bookService.saveBook(Book);
    }

    @GetMapping("/{id}")
    public Book findBookById(@PathVariable("id") Long bookId) {
        return bookService.findBookById(bookId);
    }

    @GetMapping("/all")
    public List<Book> findAllBooks() {
        return bookService.findAllBooks();
    }

    @DeleteMapping("/{id}")
    public void deleteBookById(@PathVariable("id") Long bookId) {
        bookService.deleteBookById(bookId);
    }

}
