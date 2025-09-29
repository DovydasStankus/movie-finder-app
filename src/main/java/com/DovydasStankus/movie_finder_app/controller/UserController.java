package com.DovydasStankus.movie_finder_app.controller;

import com.DovydasStankus.movie_finder_app.model.User;
import com.DovydasStankus.movie_finder_app.service.UserService;
import com.DovydasStankus.movie_finder_app.util.JwtTokenUtil;
import jakarta.servlet.SessionCookieConfig;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/v1/users")
public class UserController {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    // Constructor injection
    public UserController(JwtTokenUtil jwtTokenUtil,UserService userService, PasswordEncoder passwordEncoder) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new user
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> createUser(@Valid @RequestBody User user, BindingResult result) {
        Map<String, String> responseBody = new HashMap<>();

        // Check for validation errors
        if (result.hasErrors()) {
            // Collect all validation error messages
            FieldError firstError = result.getFieldErrors().get(0);
            String errorMessage = firstError.getDefaultMessage();

            responseBody.put("code", "400");
            responseBody.put("message", errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        // Check if username already exists
        if (userService.getUserByUsername(user.getUsername()) != null) {
            responseBody.put("code", "409"); // Conflict
            responseBody.put("message", "Username already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
        }

        if (!user.getPassword().equals(user.getPasswordConfirm())) {
            responseBody.put("code", "409");
            responseBody.put("message", "Repeat Password does not match with Password");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseBody);
        }

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save user
        User createdUser = userService.saveUser(user);

        String token = jwtTokenUtil.generateToken(user);


        responseBody.put("code", "200");
        responseBody.put("message", "Registration successful");
        responseBody.put("token", token);
        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user, HttpServletRequest request) {
        User userInDatabase;
        Map<String, String> responseBody = new HashMap<>();

        userInDatabase = userService.getUserByUsername(user.getUsername());

        if (userInDatabase == null) {
            responseBody.put("code", "404");
            responseBody.put("message", "User not found");
            return ResponseEntity.status(401).body(responseBody);
        }

        if (user.getUsername().equals(userInDatabase.getUsername())) {
            System.out.println(user.getUsername());
            System.out.println(passwordEncoder.matches(user.getPassword(), userInDatabase.getPassword()));
            System.out.println(userInDatabase.getPassword());

            if (!passwordEncoder.matches(user.getPassword(), userInDatabase.getPassword())){
                responseBody.put("code", "401");
                responseBody.put("message", "Wrong password");
                return ResponseEntity.status(401).body(responseBody);
            }

            String token = jwtTokenUtil.generateToken(userInDatabase);

            responseBody.put("code", "200");
            responseBody.put("message", "Login successful");
            responseBody.put("token", token);
            System.out.println(token);
            return ResponseEntity.ok(responseBody);
        } else {
            responseBody.put("code", "401");
            responseBody.put("message", "Invalid credentials");
            return ResponseEntity.status(401).body(responseBody);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> responseBody = new HashMap<>();

        responseBody.put("code", "200");
        responseBody.put("message", "Logout successful");

        return ResponseEntity.ok(responseBody);
    }

    // Update an existing user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.getUserById(id)
                .map(existingUser -> {
                    existingUser.setUsername(user.getUsername());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setPassword(user.getPassword());
                    // Optionally handle passwordConfirm if needed
                    User updatedUser = userService.saveUser(existingUser);
                    return ResponseEntity.ok(updatedUser);
                }).orElse(ResponseEntity.notFound().build());
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
