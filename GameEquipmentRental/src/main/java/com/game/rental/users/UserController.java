package com.game.rental.users;

import com.game.rental.users.dto.JoinDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    // 로그를 찍기 위한 Logger 객체 생성
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody JoinDto user) {
        //logger.info("Received join request: {}", user);
        System.out.println("아이디" + user.getId());
        System.out.println("비밀번호" + user.getPassword());
        System.out.println("이름" + user.getName());
        System.out.println("폰" + user.getPhone());

        if (userService.joinUser(user)) {
            //logger.info("Successfully registered user: {}", user);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "User registered successfully"));
        }

        //logger.warn("Failed to register user: {}", user);
        return ResponseEntity.badRequest().body(Collections.singletonMap("message", "User registration failed"));

    }

    @GetMapping("/info")
    public ResponseEntity<?> info(Model model) {
        // 세션에 현재 로그인 된 사용자의 id 를 확인 하는 메서드
        String id = SecurityContextHolder.getContext().getAuthentication().getName();
        // 세션에 현재 로그인 된 사용자의 role 값을 확인한는 메서드 입니다.
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        // 최종 족으로 role 에 저장이 됩니다.
        String role = auth.getAuthority();

        // 페이지 에서 불러올 때 id, role 를 호출하여 확인할 수 있습니다.
        model.addAttribute("id",id);
        model.addAttribute("role",role);
        return ResponseEntity.ok().build();
    }
}