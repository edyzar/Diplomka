package com.edwardzarecky.statisticsservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Edward Zářecký
 */

//Třída reprezentující přijímaný objekt v rámci RabbitMQ
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomMessage {

    private List<Long> bookIds;

    private Boolean isDeleted;

    private Boolean isShop;

}
