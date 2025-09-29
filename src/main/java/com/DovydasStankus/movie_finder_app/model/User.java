package com.DovydasStankus.movie_finder_app.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username is required")
    @Size(min = 4, max = 20)
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Pattern.List({
            @Pattern(regexp = ".*[A-Z].*", message = "Password must contain an uppercase letter"),
            @Pattern(regexp = ".*[a-z].*", message = "Password must contain a lowercase letter"),
            @Pattern(regexp = ".*\\d.*", message = "Password must contain a number"),
            @Pattern(regexp = ".*[^a-zA-Z0-9].*", message = "Password must contain a special character")
    })
    private String password;

    @Transient
    @NotBlank(message = "Repeat Password is required")
    private String passwordConfirm;

}
