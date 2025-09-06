package com.DovydasStankus.movie_finder_app.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class FreeMovieDBService {
    String API_URL = "https://imdb.iamidiotareyoutoo.com";
    String API_SEARCH_URL = "/search";
    // "https://imdb.iamidiotareyoutoo.com/search?q=friend"

    private final ObjectMapper objectMapper = new ObjectMapper();

    public SearchResult searchMovieDB(String q) throws IOException, InterruptedException {
        String encodedQ = URLEncoder.encode(q, StandardCharsets.UTF_8);
        String url = API_URL + API_SEARCH_URL + "?q=" + encodedQ;

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .GET()
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());

        // Parse JSON
        SearchResult result = objectMapper.readValue(response.body(), SearchResult.class);
        return result;
    }

    @Data
    public static class SearchResult {
        private boolean ok;
        private List<Movie> description;
        private int error_code;
    }

    @Data
    public static class Movie {
        @JsonProperty("#TITLE")
        public String title;

        @JsonProperty("#YEAR")
        public int year;

        @JsonProperty("#IMDB_ID")
        public String imdb_id;

        @JsonProperty("#RANK")
        public String rank;

        @JsonProperty("#ACTORS")
        public String actors;

        @JsonProperty("#AKA")
        public String aka;

        @JsonProperty("#IMDB_URL")
        public String imdb_url;

        @JsonProperty("#IMDB_IV")
        public String imdb_iv;

        @JsonProperty("#IMG_POSTER")
        public String img_poster;

        @JsonProperty("photo_width")
        public String photo_width;

        @JsonProperty("photo_height")
        public String photo_height;
    }

}
