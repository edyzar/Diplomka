package com.edwardzarecky.shopservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

/**
 * @author Edward Zářecký
 */

//Entita Shop

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long shopId;

    private String name;

    private int size;

    private String street;

    private String city;

    private String postcode;

    private String country;

    @ElementCollection
    private List<Long> bookIds;

}
