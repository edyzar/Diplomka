package com.edwardzarecky.statisticsservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * @author Edward Zářecký
 */

//Dto reprezentuje entitu Book z book-service
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDto {

    private Long bookId;

    private String name;

    private String author;

    private int pages;

    private LocalDate published;

}
