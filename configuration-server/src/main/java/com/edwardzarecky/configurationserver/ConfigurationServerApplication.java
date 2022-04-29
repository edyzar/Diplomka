package com.edwardzarecky.configurationserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

/**
 * @author Edward Zářecký
 * */
@SpringBootApplication
@EnableEurekaClient
@EnableConfigServer
public class ConfigurationServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigurationServerApplication.class, args);
	}

}
