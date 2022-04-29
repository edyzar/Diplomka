package com.edwardzarecky.user.dto;

import com.edwardzarecky.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Edward Zářecký
 */

//DTO pro propojení zákazníka s detailem knih
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private User user;

    private List<BookDto> bookDtos;

}
