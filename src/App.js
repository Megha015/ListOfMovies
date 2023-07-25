import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import Movies from "./components/Movies";

// const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=53e45db6";
// const API_URL = process.env.API_URL;
const API_URL = "http://localhost:5000/movies";
// App.js
// const API_URL = "https://movie1-qnu1.onrender.com/movies"; // Replace with your actual backend URL

const App = () => {
  const [movie, setMovie] = useState();
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // const searchMovies = async (title) => {
  //   const result = await fetch(`${API_URL}&s=${title}`);
  //   const data = await result.json();
  //   setMovie(data.Search || []);
  //   setSearchQuery(title);
  //   setSearch("");
  // };

  const searchMovies = async (title) => {
    try {
      const result = await fetch(`${API_URL}/${encodeURIComponent(title)}`);
      const data = await result.json();
      setMovie(data.Search || []);
      setSearchQuery(title);
      setSearch("");
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, show an error message, or do nothing
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    searchMovies("");
  }, []);

  return (
    <div>
      <div className="app">
        <h1>Search For Movies</h1>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Enter the movie name"
          value={search}
          onChange={handleChange}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(search);
          }}
        />
      </div>
      <div>
        {searchQuery && <h1 className="resu">Results for {searchQuery}</h1>}
        {movie?.length > 0 ? (
          <div className="container">
            {movie.map((movie) => (
              <Movies movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
