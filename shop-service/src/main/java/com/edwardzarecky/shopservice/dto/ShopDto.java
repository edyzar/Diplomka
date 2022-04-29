package com.edwardzarecky.shopservice.dto;

import com.edwardzarecky.shopservice.entity.Shop;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Edward Zářecký
 */

//DTO pro propojení obchodu s detailem knih
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopDto {

    private Shop shop;

    private List<BookDto> bookDtos;

}
