package com.edwardzarecky.statisticsservice.component;

import com.edwardzarecky.statisticsservice.config.RabbitConfig;
import com.edwardzarecky.statisticsservice.dto.CustomMessage;
import com.edwardzarecky.statisticsservice.entity.CustomerStats;
import com.edwardzarecky.statisticsservice.entity.ShopStats;
import com.edwardzarecky.statisticsservice.service.CustomerStatsService;
import com.edwardzarecky.statisticsservice.service.ShopStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author Edward Zářecký
 */

//Komponenta přijimající zprávy z RabbitMQ
//statistics-service vystupuje v roli konzumenta RabbitMQ

@Component
@RequiredArgsConstructor
public class RabbitListenerComponent {

    private final CustomerStatsService customerStatsService;

    private final ShopStatsService shopStatsService;

    @RabbitListener(queues = RabbitConfig.QUEUE)
    public void userListener(CustomMessage customMessage) {

        //je přijímaná zpráva z shop-service
        if (customMessage.getIsShop()) {
            List<ShopStats> shopStatsList = shopStatsService.mapToShopStats(customMessage);

            //byla smazána kniha v obchodě
            if (customMessage.getIsDeleted()) {
                //odečti jedna u obchodů nabízejících knihu
                shopStatsService.deleteShopStats(shopStatsList);
            } else {
                //přičti jedna u obchodů nabízejících knihu
                shopStatsService.saveShopStats(shopStatsList);
            }
            //zpráva byla zaslána z user-service
        } else {
            List<CustomerStats> customerStatsList = customerStatsService.mapToCustomerStats(customMessage);

            //byla smazána kniha u zákazníka
            if (customMessage.getIsDeleted()) {
                //odečti jedna u oblíbenosti knihy
                customerStatsService.deleteCustomerStats(customerStatsList);
            } else {
                //přičti jedna u oblíbenosti knihy
                customerStatsService.saveCustomerStats(customerStatsList);
            }
        }
    }

}
