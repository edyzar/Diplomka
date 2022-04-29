package com.edwardzarecky.statisticsservice.controller;

import com.edwardzarecky.statisticsservice.dto.ShopStatsDto;
import com.edwardzarecky.statisticsservice.service.ShopStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Edward Zářecký
 * */

//Kontroler pro práci se se statistikami zákazníků

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/shopstats")
public class ShopStatsController {

    private final ShopStatsService shopStatsService;

    @GetMapping("/all")
    public List<ShopStatsDto> findAllShopStatsDto() {
        return shopStatsService.findAllShopStatsDto();
    }

}
