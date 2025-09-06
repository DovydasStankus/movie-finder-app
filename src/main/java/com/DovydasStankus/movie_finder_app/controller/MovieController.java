package com.DovydasStankus.movie_finder_app.controller;

import com.DovydasStankus.movie_finder_app.service.FreeMovieDBService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/v1")
public class MovieController {

    private final FreeMovieDBService freeMovieDBService;

    public MovieController(FreeMovieDBService freeMovieDBService) {
        this.freeMovieDBService = freeMovieDBService;
    }

    @GetMapping("/search")
    public FreeMovieDBService.SearchResult getSearchResult(@RequestParam String q) {
        try {
            return freeMovieDBService.searchMovieDB(q);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException("Failed to fetch movie data", e);
        }
    }

}
