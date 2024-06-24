package com.game.rental.security;

import com.game.rental.security.jwt.util.JWTUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReissueController {
    private final JWTUtil jwtUtil;

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest req, HttpServletResponse res) {
        // get refresh token
        String refresh = null;
        Cookie[] cookies = req.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }
        // if refresh token is null redirect bad_request
        if (refresh == null) {
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }
        // refresh token expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            // response status code
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }
        String category = jwtUtil.getCategory(refresh);
        // refresh token check category is refresh
        if (!category.equals("refresh")) {
            // response status code
            return new ResponseEntity<>("refresh token invalid", HttpStatus.BAD_REQUEST);
        }
        String id = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);

        // make new access token
        String newAccess = jwtUtil.createJwt(category,id,role,600000L);
        res.setHeader("access", newAccess);
        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
