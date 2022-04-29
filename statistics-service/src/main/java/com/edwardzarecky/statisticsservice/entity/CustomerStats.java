package com.edwardzarecky.statisticsservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author Edward Zářecký
 * */

//Entita CustomerStats

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerStats {

    @Id
    private Long bookId;

    private int numberOfOwners;

}
