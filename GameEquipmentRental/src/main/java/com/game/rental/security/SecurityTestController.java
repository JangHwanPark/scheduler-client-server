package com.game.rental.security;

import com.game.rental.users.entity.UserEntity;
import com.game.rental.users.entity.UserEntityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SecurityTestController {
    private final UserEntityRepository userEntityRepository;
    @GetMapping("/info")
    public ResponseEntity<?> api1() {
        // 접속한 사용자 이름 id 값
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        // 사용자 role 값
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();
        Map<String, String > map = new HashMap<>();
        map.put("id",name);
        map.put("role",role);
        UserEntity user = userEntityRepository.findByLoginId(name);
        map.put("phone_number", user.getUserPhoneNumber());
        map.put("user_name", user.getUserName());
        return ResponseEntity.ok(map);
    }

}
