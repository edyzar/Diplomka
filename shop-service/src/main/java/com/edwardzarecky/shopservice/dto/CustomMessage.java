package com.edwardzarecky.shopservice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author Edward Zářecký
 */

//Třída reprezentující posílaný objekt v rámci RabbitMQ
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomMessage implements Serializable {

    @JsonProperty("bookIds")
    private List<Long> bookIds;

    @JsonProperty("isDeleted")
    private Boolean isDeleted;

    @JsonProperty("isShop")
    private Boolean isShop;

}

