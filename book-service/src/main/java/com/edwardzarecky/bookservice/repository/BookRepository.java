package com.edwardzarecky.bookservice.repository;

import com.edwardzarecky.bookservice.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edward Zářecký
 * */

//Repository pro práci s databází s entitou Book

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
