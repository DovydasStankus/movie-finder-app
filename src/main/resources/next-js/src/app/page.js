"use client";

import Image from "next/image";

import { useState, useEffect } from 'react';


export default function Home() {
  const BACKEND_API_URL = "https://imdb.iamidiotareyoutoo.com";
  const API_SEARCH_URL = "/search";

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSearch = async () => {
    setMovies([]);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/v1/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      console.log(data);

      if (data.ok) {
        // Your backend returns an object with 'description' list
        const transformedMovies = data.description.map((movie) => ({
        title: movie['#TITLE'],
        year: movie['#YEAR'],
        imdb_id: movie['#IMDB_ID'],
        rank: movie['#RANK'],
        actors: movie['#ACTORS'],
        aka: movie['#AKA'],
        imdb_url: movie['#IMDB_URL'],
        imdb_iv: movie['#IMDB_IV'],
        img_poster: movie['#IMG_POSTER'],
        photo_width: movie['photo_width'],
        photo_height: movie['photo_height'],
        }));

        setMovies(transformedMovies);
      } else {
        setError('Error fetching movies');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <h1 style={{textAlign: "center"}}>Movie Finder App</h1>
      <h1 style={{textAlign: "center"}}>Search Movies</h1>
      <div>
        <div style={{margin: "auto"}} className="bg-sky-800 rounded-lg">
          <input
            style={{margin: "5px"}}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies"
            className="bg-sky-200 rounded-lg"
          />
          <button
            style={{margin: "5px"}}
            onClick={handleSearch}
            className="bg-sky-500 rounded-lg"
            >Search
          </button>
        </div>
      </div>

      {loading && <div style={{textAlign: "center"}}><p>Loading...</p></div>}
      {error && <div style={{textAlign: "center"}}><p style={{ color: 'red' }}>{error}</p></div>}

      {movies.length > 0 && (
        <div style={{textAlign: "center", marginTop: "20px"}}>
          {movies.map((movie, index) => (
            <div key={index} style={{ margin: "20px", padding: "10px", gap: "20px"}} className="bg-sky-500 rounded-lg flex">
              <img
                src={movie.img_poster}
                alt={movie.title}
                width={128}
                className="rounded-lg"
              />
              <div style={{display: "grid", gridTemplateRows: "auto auto auto 1fr", textAlign: "left", width: "-moz-available"}}>
                <div><h2>{movie.title}</h2></div>
                <div><p>Year: {movie.year}</p></div>
                <div><p>Actors: {movie.actors}</p></div>
                <div style={{ alignSelf: "end", textAlign: "right" }}><a href={movie.imdb_url} target="_blank" rel="noopener noreferrer">
                  View on IMDB
                </a></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}