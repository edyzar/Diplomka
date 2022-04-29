package com.edwardzarecky.statisticsservice.controller;

import com.edwardzarecky.statisticsservice.dto.CustomerStatsDto;
import com.edwardzarecky.statisticsservice.service.CustomerStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Edward Zářecký
 * */

//Kontroler pro práci se se statistikami obchodů

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/customerstats")
public class CustomerStatsController {

    private final CustomerStatsService customerStatsService;

    @GetMapping("/all")
    public List<CustomerStatsDto> findAllCustomerStatsDto() {
        return customerStatsService.findAllCustomerStatsDto();
    }

}
