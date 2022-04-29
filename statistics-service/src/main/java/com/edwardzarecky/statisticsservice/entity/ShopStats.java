package com.edwardzarecky.statisticsservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author Edward Zářecký
 * */

//Entita ShopStats
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopStats {

    @Id
    private Long bookId;

    private int salesPoints;

}