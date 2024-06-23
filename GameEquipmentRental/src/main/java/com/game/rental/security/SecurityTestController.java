package com.game.rental.security;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Iterator;

@RestController
public class SecurityTestController {
    @GetMapping("/api1")
    public ResponseEntity<?> api1() {
        // 접속한 사용자 이름 id 값
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        // 사용자 role 값
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();
        return ResponseEntity.ok("api1 name : "+name+" role : "+role);
    }

    @GetMapping("/api2")
    public ResponseEntity<?> api2() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();
        return ResponseEntity.ok("api2 name : "+name +" role : "+role);
    }
}
