package com.DovydasStankus.movie_finder_app.repository;


import com.DovydasStankus.movie_finder_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
