package com.edwardzarecky.shopservice.controller;

import com.edwardzarecky.shopservice.config.RabbitConfig;
import com.edwardzarecky.shopservice.dto.CustomMessage;
import com.edwardzarecky.shopservice.dto.ShopDto;
import com.edwardzarecky.shopservice.entity.Shop;
import com.edwardzarecky.shopservice.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Edward Zářecký
 */

//Kontroler pro práci s obchody

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/shop")
public class ShopController {

    private final ShopService shopService;

    private final RabbitTemplate rabbitTemplate;

    @PostMapping("/")
    public Shop saveShop(@RequestBody Shop shop) {
        Shop saveShop = shopService.saveShop(shop);
        CustomMessage customMessage = shopService.mapToCustomMessage(shop, false, true);
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_KEY, customMessage);
        return saveShop;
    }

    @GetMapping("/detail/{id}")
    public ShopDto shopWithBooksDetail(@PathVariable("id") Long shopId) {
        return shopService.shopWithBooksDetail(shopId);
    }

    @GetMapping("/all")
    public List<Shop> findAllShops() {
        return shopService.findAllShops();
    }

    @DeleteMapping("/{id}")
    public void deleteShopById(@PathVariable("id") Long shopId) {
        Shop shop = shopService.findShopById(shopId);
        CustomMessage customMessage = shopService.mapToCustomMessage(shop, true, true);
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_KEY, customMessage);
        shopService.deleteShopById(shopId);
    }

}
