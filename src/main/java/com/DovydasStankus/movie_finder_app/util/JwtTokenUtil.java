package com.DovydasStankus.movie_finder_app.util;


import com.DovydasStankus.movie_finder_app.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenUtil {
    final private String secretKey = "Qj2SU1ZC6qZNR+xTvcgUBk1XiYtOsxgNRzH6yR9etFo=";

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
