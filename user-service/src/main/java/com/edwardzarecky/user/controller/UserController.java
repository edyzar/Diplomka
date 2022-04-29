package com.edwardzarecky.user.controller;

import com.edwardzarecky.user.config.RabbitConfig;
import com.edwardzarecky.user.dto.CustomMessage;
import com.edwardzarecky.user.dto.UserDto;
import com.edwardzarecky.user.entity.User;
import com.edwardzarecky.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;

/**
 * @author Edward Zářecký
 */

//Kontroler pro práci se zákazníky
//Jednotlivé metody mají nastavené @RolesAllowed() se specifickou rolí
//V případě zaslání požadavku bez potřebné role vrací 401 Unauthorized

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/user")
@CrossOrigin
public class UserController {
    private final UserService userService;

    private final RabbitTemplate rabbitTemplate;

    @PostMapping("/")
    @RolesAllowed("role_admin")
    public User saveUser(@RequestBody User user) {
        User saveUser = userService.saveUser(user);
        CustomMessage customMessage = userService.mapToCustomMessage(user, false, false);
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_KEY, customMessage);
        return saveUser;
    }

    //Pro načtení detailu knih zákazníka dle bookId
    @GetMapping("/detail/{id}")
    @RolesAllowed("role_admin")
    public UserDto userWithBooksDetail(@PathVariable("id") Long userId) {
        return userService.userWithBooksDetail(userId);
    }

    @GetMapping("/all")
    @RolesAllowed({"role_admin", "role-user"})
    public List<User> findAllUsers() {
        return userService.findAllUser();
    }

    @DeleteMapping("/{id}")
    @RolesAllowed("role_admin")
    public void deleteUserById(@PathVariable("id") Long userId) {
        User user = userService.findUserById(userId);
        //Zde je vidět přidání zprávy a poslání RabbitemMQ
        CustomMessage customMessage = userService.mapToCustomMessage(user, true, false);
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE, RabbitConfig.ROUTING_KEY, customMessage);
        userService.deleteUserById(userId);
    }

}
