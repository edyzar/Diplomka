package com.edwardzarecky.statisticsservice.dto;

import com.edwardzarecky.statisticsservice.entity.CustomerStats;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Edward Zářecký
 */

//DTO pro propojení zákazníka s knihou

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerStatsDto {

    private CustomerStats customerStats;

    private BookDto bookDto;

}
