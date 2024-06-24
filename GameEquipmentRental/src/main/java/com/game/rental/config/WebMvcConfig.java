package com.game.rental.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173")  // 클라이언트의 주소를 명시
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                // 요청 헤더 허용
                .allowedHeaders("Authorization", "access", "content-type", "refresh-token", "refresh-token-expiration-date", "withCredentials", "x-xsrf-token", "x-requested-with", "x-csrf-token", "x-xs")
                 // 응답 헤더 허용
                .exposedHeaders("Authorization", "access", "refresh-token", "refresh-token-expiration-date", "x-xsrf-token", "x-requested-with", "x-csrf-token", "x-xs");
    }
}