package com.game.rental.config;


import com.game.rental.security.entity.RefreshEntityRepository;
import com.game.rental.security.jwt.filter.JWTFIlter;
import com.game.rental.security.jwt.filter.LoginFilter;
import com.game.rental.security.jwt.filter.LogoutFilter;
import com.game.rental.security.jwt.util.JWTUtil;
import com.game.rental.users.entity.UserEntityRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    //AuthenticationManager가 인자로 받을 AuthenticationConfiguraion 객체 생성자 주입
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final RefreshEntityRepository refreshEntityRepository;
    private final UserEntityRepository userEntityRepository;

    //AuthenticationManager Bean 등록
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf((auth) -> auth.disable());
        // jwt 구현시 formLogin 을 사용 하지 않음
        http
                .formLogin((auth) -> auth.disable());
        http
                .httpBasic((auth) -> auth.disable());

        http
                .authorizeHttpRequests((auth) -> auth
                        /**
                         * 다음 코드는 URL 호출에 대해 권한을 지정하는 코드 입니다.
                         * */
                        .requestMatchers("/user/**", "/page/**","/reissue").permitAll()
                        .requestMatchers("/api1").hasRole("USER")
                        .requestMatchers("/admin/**", "/api2").hasRole("ADMIN")
                        .anyRequest().authenticated());
        // jwt 필터 등록
        http
                .addFilterAt(new JWTFIlter(jwtUtil), LoginFilter.class);
        //필터 추가 LoginFilter()는 인자를 받음 (AuthenticationManager() 메소드에 authenticationConfiguration 객체를 넣어야 함) 따라서 등록 필요
        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration),jwtUtil, refreshEntityRepository, userEntityRepository), UsernamePasswordAuthenticationFilter.class);
        // jwt 를 이용하여 로그인 로직을 구현시 session 을 사용하지 않아 session을 stateless 상태로 설정
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        // cors 세팅
        http
                .cors((cors) ->
                        cors.configurationSource(new CorsConfigurationSource() {

                            @Override
                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                                CorsConfiguration config = new CorsConfiguration();

                                //프론트에서 데이터를 요청 및 보내기 때문에 프론트의 포트 번호를 설정
                                config.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
                                // GET, POST, PUT, DELETE, OPTION을 모두 허용할 것이기 때문에 *로 지정
                                config.setAllowedMethods(Collections.singletonList("*"));
                                // 프론트 부분에서 credentials 설정 시 모두 허용하기 위해 true 설정
                                config.setAllowCredentials(true);
                                // 허용할 Header 설정
                                config.setAllowedHeaders(Collections.singletonList("*"));
                                // 허용할 시간을 설정
                                config.setMaxAge(3600L);
                                // 서버에서 클라이언트로 사용자에게 JWT를 담아 넘겨줄 헤더를 지정
                                config.setExposedHeaders(Collections.singletonList("Authorization"));

                                return config;
                            }
                        })
                );
        // 로그아웃 필터 등록
        http
                .addFilterBefore(new LogoutFilter(jwtUtil, refreshEntityRepository), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}