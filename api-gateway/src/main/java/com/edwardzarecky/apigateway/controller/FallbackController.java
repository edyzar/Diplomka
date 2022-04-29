package com.edwardzarecky.apigateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Edward Zářecký
 */

//Controller se specifickými hláškami pro každou z nich v případě nedostupnosti mikroslužeb

@RestController
public class FallbackController {

    @GetMapping("/defaultFallback")
    public String defaultFallback() {
        return "Nastala chyba. Prosím zkuste to později.";
    }

    @GetMapping("/userFallback")
    public String userServiceFallback() {
        return "Nastala chyba ve službě user-service. Prosím zkuste to později.";
    }

    @GetMapping("/shopFallback")
    public String shopServiceFallback() {
        return "Nastala chyba ve službě shop-service. Prosím zkuste to později.";
    }

    @GetMapping("/bookFallback")
    public String bookServiceFallback() {
        return "Nastala chyba ve službě book-service. Prosím zkuste to později.";
    }

    @GetMapping("/statsFallback")
    public String statsServiceFallback() {
        return "Nastala chyba ve službě statistics-service. Prosím zkuste to později.";
    }

}
