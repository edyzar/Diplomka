package com.edwardzarecky.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * @author Edward Zářecký
 */

//Konfigurace pro směrování dotazů do mikroslužeb s případným ošetřením nedostupnosti

@Configuration
public class RoutingConfiguration {

    @Bean
    public RouteLocator myRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/v1/user/**")
                        .filters(f -> f.circuitBreaker(c -> c.setName("shopServiceFallback").setFallbackUri("/userFallback")))
                        .uri("lb://user-service"))
                .route(p -> p
                        .path("/v1/shop/**")
                        .filters(f -> f.circuitBreaker(c -> c.setName("shopServiceFallback").setFallbackUri("/shopFallback")))
                        .uri("lb://shop-service"))
                .route(p -> p
                        .path("/v1/book/**")
                        .filters(f -> f.circuitBreaker(c -> c.setName("bookServiceFallback").setFallbackUri("/bookFallback")))
                        .uri("lb://book-service"))
                .route(p -> p
                        .path("/v1/customerstats/**")
                        .filters(f -> f.circuitBreaker(c -> c.setName("statsFallback").setFallbackUri("/statsFallback")))
                        .uri("lb://statistics-service"))
                .route(p -> p
                        .path("/v1/shopstats/**")
                        .filters(f -> f.circuitBreaker(c -> c.setName("statsFallback").setFallbackUri("/statsFallback")))
                        .uri("lb://statistics-service"))
                .build();
    }

}
