package com.game.rental.security.jwt.util;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JWTUtil {
    // 암호화된 SecretKey 를 담기위한 객체 생성
    private SecretKey secretKey;

    // JWTUtil 클래스가 로드가 될 때 실행
    // yml 파일에 있는 secret key 를 읽어와 hs256을 사용해 암호화하여 저장하는 메서드
    public JWTUtil(@Value("${spring.jwt.secret}") String secret) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }
    // 아래에 있는 3개의 메서드 들은 검증을 진행하는 메서드 입니다.
    // 사용자의 id 값을 검증하는 메서드 입니다.
    public String getUsername(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }
    // 사용자의 권한을 검증하는 메서드 입니다.
    public String getRole(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }
    // 토큰이 만료가 되었는지 검증하는 메서드 입니다.
    public Boolean isExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }
    // 이 메서드는 토큰을 생성하는 메서드 입니다.
    public String createJwt(String username, String role, Long expiredMs) {
        return Jwts.builder()
                .claim("username", username)
                .claim("role", role)
                // 현재 발행시간
                .issuedAt(new Date(System.currentTimeMillis()))
                // 현재 발행시간 + 인자로 받은 추가될 시간
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }
}
