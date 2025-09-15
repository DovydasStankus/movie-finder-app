"use client";

import Image from "next/image";

import { useState, useEffect } from 'react';

const MOVIES_PER_PAGE = 5;

export default function Home() {
  const BACKEND_API_URL = "https://imdb.iamidiotareyoutoo.com";
  const API_SEARCH_URL = "/search";

  const keyUp = (event) => {
    if (event.key === 'Enter'){
      handleSearch()
    }
  };

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);


  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const currentMovies = movies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  const handleSearch = async () => {
    setMovies([]);
    setLoading(true);
    setError(null);
    setCurrentPage(1);
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
      <h1 style={{textAlign: "center", marginTop: "20px", fontWeight: "bold"}}>Movie Finder App</h1>
      <div style={{marginBlock: "20px"}}>
        <div 
          style={{display: "flex", margin: "auto", width: "min-content"}}
          className="bg-gray-200 border border-neutral-100 rounded-lg"
          >
          <input
            value={query}
            onKeyUp={keyUp}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies"
            className="bg-gray-200 rounded-lg !outline-none h-8"
            style={{padding: "10px", margin: "auto auto"}}
          />
          <button
            onClick={handleSearch}
            className="bg-gray-300 hover:bg-gray-400 active:bg-gray-100 rounded-lg"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
      </div>

      {loading && <div style={{textAlign: "center", margin: "15px"}}>
        <div style={{margin: "auto"}} className="border-4 border-gray-200 border-t-gray-600 rounded-full w-10 h-10 animate-spin"></div>
      </div>}
      {error && <div style={{textAlign: "center", margin: "15px"}}><p style={{ color: 'red' }}>{error}</p></div>}

      {movies.length > 0 && (

        <div className="bg-gray-50 rounded-lg" style={{textAlign: "center", width: "120vh", margin: "auto", paddingBlock: "1px"}} >
          {currentMovies.map((movie, index) => (
            <div key={index} style={{ margin: "20px", padding: "10px", gap: "20px", height: "212px"}} className="bg-gray-200 border border-neutral-100 rounded-lg flex">
              <img
                style={{maxWidth: "128px", minWidth: "128px", maxHeight: "190px", minHeight: "190px"}}
                src={movie.img_poster}
                alt={movie.title}
                className="rounded-lg border border-neutral-300"
              />
              <div style={{display: "grid", gridTemplateRows: "auto auto auto 1fr", textAlign: "left", width: "-moz-available"}}>
                <div><h2 style={{fontWeight: "bold", marginBottom: "4px", fontSize: "20px"}}>{movie.title}</h2></div>
                <div><p style={{fontWeight: "bold"}}>Year: <span style={{fontWeight: "normal"}}>{movie.year}</span></p></div>
                <div><p style={{fontWeight: "bold"}}>Actors: <span style={{fontWeight: "normal"}}>{movie.actors}</span></p></div>
                <div className="flex" style={{justifyContent: "space-between"}}>
                  <div 
                    style={{alignSelf: "end"}}
                    >
                      <a 
                        style={{padding: "3px", display: "inline-block"}}
                        href={movie.imdb_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-300 hover:bg-gray-400 active:bg-gray-100 rounded-lg border border-neutral-300"
                        >
                    View on IMDB
                    </a>
                  </div>
                  <div
                    style={{alignSelf: "end"}}
                    >
                      <button
                        style={{padding: "5px", display: "inline-block"}}
                        className="bg-gray-300 hover:bg-gray-400 active:bg-gray-100 rounded-lg border border-neutral-300"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div style={{marginBlock: "20px"}}>
            <div 
              style={{display: "flex", marginTop: "20px", justifyContent: "center", width: "min-content", margin: "auto", height: "46px"}}
              
              className="rounded-lg border border-neutral-100 bg-gray-200"
              >
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage > 1 ? "rounded-l-lg bg-gray-200 hover:bg-gray-300 active:bg-gray-100 border-r border-neutral-100" : "rounded-l-lg bg-gray-200 border-r border-neutral-100 text-gray-500"}
                style={{paddingInline: "4px", width: "80px"}}
                disabled={currentPage === 1}
                >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  className={currentPage === i + 1 ? "bg-gray-100 text-zinc-800" : "bg-gray-200 hover:bg-gray-300 active:bg-gray-100"}
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  style={{
                    paddingInline: "4px",
                    fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className={currentPage < totalPages ? "rounded-r-lg bg-gray-200 hover:bg-gray-300 active:bg-gray-100 border-l border-neutral-100" : "rounded-r-lg bg-gray-200 border-l border-neutral-100 text-gray-500"}
                style={{paddingInline: "4px", width: "80px"}}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>

        </div>

      )}
    </div>
  );
}

