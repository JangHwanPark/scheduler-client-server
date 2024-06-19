package com.game.rental.security.config;

import com.game.rental.security.CustomAuthenticationFailureHandler;
import com.game.rental.users.CustomUserDetailsService;
import com.game.rental.users.entity.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
// 아래 어노테이션을 이용시 상속 없이 Spring 의 기능을 사용할 수 있다.
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final UserEntityRepository userEntityRepository;
    private final PasswordEncoder passwordEncoder;
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
                            .requestMatchers("/user/**", "/page/**").permitAll()
                            .requestMatchers("/api1").hasRole("user")
                            .requestMatchers("/admin/**", "/api2").hasRole("admin")
                            .anyRequest().authenticated()
                )
                .formLogin(formLogin ->
                        formLogin
                                .loginPage("/page/login") // 로그인 페이지 경로
                                .loginProcessingUrl("/login") // 로그인 처리 URL
                                .usernameParameter("username") // 폼의 사용자명 필드 이름
                                .passwordParameter("password") // 폼의 비밀번호 필드 이름
                                .defaultSuccessUrl("/page/result", true) // 로그인 성공 시 이동할 페이지
                                .failureHandler(new CustomAuthenticationFailureHandler()) // 로그인 실패 핸들러
                                .permitAll()
                )
                .logout((logout) ->
                        logout.logoutUrl("/user/logout").permitAll()
                );
        return http.build();
    }

    /**
     * 다음은 인가가 이루어지는 부분 입니다.
     * 인가는 간단하게 권한이라고 볼 수 있습니다. 호출되는 API나 URL 별로 권한을 체크하는 부분으로 로그인한 사용자의 권한에 따라 API나 URL을 다르게 허용할 수 있다.
     * 유저 정보를 리턴하는 부분에 해당 유저의 롤을 정의.
     * */
//    @Bean
//    public UserDetailsService userDetailsService() {
//        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
//        아래와 같은 코드는 비밀번호가 암호화가 되지 않아 로그인이 되지 않음
//        manager.createUser(User.withUsername("user1").password("1234").roles("user").build());
//        passwordEncoder().encode 를 사용하여 비밀번호를 암호화를 해둬야지만 사용 가능
//        manager.createUser(User.withUsername("user1").password(passwordEncoder().encode("1234")).roles("user").build());
//        return manager;
//    }
    /**
     * 이 메서드는 Spring Security에서 사용자 인증을 처리하는 데 필요한 UserDetailsService를 정의합니다.
     * UserDetailsService는 주어진 사용자 이름(username)에 대한 사용자 정보를 로드하는 메서드를 제공합니다.
     * CustomUserDetailsService 클래스는 UserDetailsService 인터페이스를 구현하며, loadUserByUsername 메서드를 통해 사용자 이름으로 사용자를 조회하고, 그 사용자에 대한 인증 정보를 반환합니다.
     * 이 UserDetailsService 빈은 Spring Security의 인증 과정에서 사용자 정보를 조회하는 데 사용됩니다.
     * */
    @Bean
    public UserDetailsService userDetailsService() {
        return new CustomUserDetailsService(userEntityRepository);
    }
    /**
     * 이 메서드는 Spring Security에서 인증 관리를 처리하는 AuthenticationManager를 정의합니다.
     * AuthenticationManager는 실제로 사용자 인증을 처리하는 역할을 합니다.
     * 여기서 AuthenticationManager를 구성하는 중요한 부분은 AuthenticationManagerBuilder를 사용하여 UserDetailsService와 PasswordEncoder를 설정하는 것입니다.
     * userDetailsService: 이 설정은 UserDetailsService를 사용하여 사용자를 조회하도록 AuthenticationManager를 구성합니다. 앞서 정의한 CustomUserDetailsService가 사용됩니다.
     * passwordEncoder: 이 설정은 비밀번호를 비교할 때 사용할 PasswordEncoder를 정의합니다. 비밀번호를 저장할 때와 로그인할 때 모두 같은 인코딩 방식을 사용해야 합니다.
     * 이 AuthenticationManager 빈은 Spring Security가 인증 요청을 처리할 때 사용됩니다.
     * HttpSecurity 설정에서 기본적으로 이 AuthenticationManager를 사용하여 인증을 처리합니다.
     * */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
        auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder);
        return auth.build();
    }
}
