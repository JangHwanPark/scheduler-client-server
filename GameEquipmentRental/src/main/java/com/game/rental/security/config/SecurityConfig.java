package com.game.rental.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
// 아래 어노테이션을 이용시 상속 없이 Spring 의 기능을 사용할 수 있다.
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    /*
      SecurityFilterChain이 요청을 가로채서 설정된 인증, 인가 부분을 체크 하고 난 다음 흐름으로 이어지게 된다.
      따라서 SecurityConfig 클래스에서 모든 관련 설정을 간단하게 할 수 있게 되어 내부의 비즈니스 로직에 영향을 덜 미치게 됨
      */
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests((authorizeRequests) ->
//                            요청되는 모든 URL을 허용
//                            authorizeRequests.anyRequest().permitAll()
//                        );
//        return http.build();
//    }

    /**
     * 가장 기본적인 아이디 페스워드 방식을 Security를 이용해 처리하는 부분 입니다.
     * */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf((csrf)-> csrf.disable()) // CSRF 비활성화 (테스트 목적)
                .authorizeHttpRequests((authorizeRequests) ->
                    authorizeRequests
                            /**
                             * 다음 코드는 URL 호출에 대해 권한을 지정하는 코드 입니다.
                             * */
                            .requestMatchers("/user/**").permitAll()
                            .requestMatchers("/api1").hasRole("user")
                            .requestMatchers("/admin/**","/api2").hasRole("admin")
                            .anyRequest().authenticated()
                )
                .formLogin((formLogin) ->
                        formLogin
                                .loginPage("/user/login")
                                .usernameParameter("username")
                                .passwordParameter("password")
                                .defaultSuccessUrl("/api1",true)
                )
                .logout((logout) ->
                                logout.logoutUrl("/user/logout").permitAll()
                        );
        return http.build();
    }

    /**
     * Spring이 패스워드는 인코딩해야 한다는 보안 부분을 강제하기 때문에 이 부분이 추가됨
     * 패스워드는 중요한 개인정보 중 하나이기 때문에 암호화하여 저장함.
     * 이를 위해 PasswordEncoder를 사용하면 쉽게 암호화가 가능
     * */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * 다음은 인가가 이루어지는 부분 입니다.
     * 인가는 간단하게 권한이라고 볼 수 있습니다. 호출되는 API나 URL 별로 권한을 체크하는 부분으로 로그인한 사용자의 권한에 따라 API나 URL을 다르게 허용할 수 있다.
     * 유저 정보를 리턴하는 부분에 해당 유저의 롤을 정의.
     * */
    @Bean
    public UserDetailsService userDetailsService() {
        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
//        아래와 같은 코드는 비밀번호가 암호화가 되지 않아 로그인이 되지 않음
//        manager.createUser(User.withUsername("user1").password("1234").roles("user").build());
//        passwordEncoder().encode 를 사용하여 비밀번호를 암호화를 해둬야지만 사용 가능
        manager.createUser(User.withUsername("user1").password(passwordEncoder().encode("1234")).roles("user").build());
        return manager;
    }
}
