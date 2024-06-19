package com.game.rental.security;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityTestController {
    @GetMapping("/api1")
    public ResponseEntity<?> api1() {
        return ResponseEntity.ok("api1");
    }

    @GetMapping("/api2")
    public ResponseEntity<?> api2() {
        return ResponseEntity.ok("api2");
    }
}
