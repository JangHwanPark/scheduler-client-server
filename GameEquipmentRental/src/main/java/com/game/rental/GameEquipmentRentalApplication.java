package com.game.rental;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.Date;

@SpringBootApplication
@RestController
public class GameEquipmentRentalApplication {

	public static void main(String[] args) {
		SpringApplication.run(GameEquipmentRentalApplication.class, args);
	}

	// CORS Setting
	// http://localhost:5173 모든 요청 허용
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
				// 모든 경로, http 메소드, http://localhost:5173 도메인 허용
				registry.addMapping("/**")
						.allowedMethods("*")
						.allowedOrigins("http://localhost:5173");
			}
		};
	}
}