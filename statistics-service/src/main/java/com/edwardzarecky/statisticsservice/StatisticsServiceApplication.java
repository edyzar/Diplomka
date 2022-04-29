package com.edwardzarecky.statisticsservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * @author Edward Zářecký
 * */
@SpringBootApplication
@EnableEurekaClient
public class StatisticsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StatisticsServiceApplication.class, args);
	}

	//beana pro dotazy do mikroslužeb (zde se využívá pro načtení detailu knih z book-service)
	@Bean
	@LoadBalanced
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

}
