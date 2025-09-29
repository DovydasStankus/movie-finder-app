package com.DovydasStankus.movie_finder_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // disable CSRF if not needed
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/public/**").permitAll() // public endpoints
//                        .requestMatchers("/admin/**").hasRole("ADMIN") // admin only
//                        .anyRequest().authenticated() // all other requests require authentication
//                )
//                .httpBasic(); // use basic auth for simplicity
//
//        return http.build();
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .anyRequest().permitAll()
                )
                .csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
}
