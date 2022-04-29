package com.edwardzarecky.statisticsservice.dto;

import com.edwardzarecky.statisticsservice.entity.ShopStats;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Edward Zářecký
 */

//DTO pro propojení obchodu s knihou
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopStatsDto {

    private ShopStats shopStats;

    private BookDto bookDto;

}
