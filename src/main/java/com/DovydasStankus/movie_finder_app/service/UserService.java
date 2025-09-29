package com.DovydasStankus.movie_finder_app.service;

import com.DovydasStankus.movie_finder_app.model.User;
import com.DovydasStankus.movie_finder_app.repository.UserRepository;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User getUserByUsername(String username);
    User saveUser(User user);
    void deleteUser(Long id);
}
