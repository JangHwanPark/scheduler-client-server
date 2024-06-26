package com.game.rental.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;

/**
 * 인가 처리 중 오류가 발생시 에러에 대한 설명을 반환해주는 헨들러 입니다.
 * */
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        System.out.println("Authentication failed: " + exception.getMessage());
        response.sendRedirect("/page/login?error");
        response.setStatus(HttpServletResponse.SC_FOUND);
    }
}
