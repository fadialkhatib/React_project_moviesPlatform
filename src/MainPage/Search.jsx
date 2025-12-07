// Search.jsx
import { useState, useEffect, } from "react";
import { useDebounce } from "react-use";
import searchimg from "../assets/MainPage/search-icon-free-vector.jpg";
import MovieCard from "./MovieCard"; // تأكد أن المسار صحيح

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}
export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [debounce, setDebounce] = useState(''); 


  useDebounce(() => {
    setDebounce(searchTerm),500,[searchTerm]
  });

  useEffect(() => {
    if (!searchTerm.trim()) {
      setMovieList([]);
      setError("");
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError("");
      try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}`;
          const res = await fetch(url,API_OPTIONS)
              

        if (!res.ok) throw new Error("Failed to fetch search results");

        const data = await res.json();
        setMovieList(Array.isArray(data.results) ? data.results : []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to load results");
        setMovieList([]);
      } finally {
        setIsLoading(false);
      }
    };

const timer = setTimeout(fetchSearchResults, 400);
    return () => clearTimeout(timer);
}, [searchTerm]);

  // لا نعرض شيئًا إذا لم يُدخل المستخدم نصًا
  if (!searchTerm.trim()) return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <img className="search-img" src={searchimg} alt="search" />
        <input
          type="text"
          placeholder="Search through +1000 of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <img className="search-img" src={searchimg} alt="search" />
        <input
          type="text"
          placeholder="Search through +1000 of movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* عرض نتائج البحث فقط عند وجود نص */}
      <div className="search-results-section">
        {isLoading && <p>Loading results...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!isLoading && !error && movieList.length === 0 && (
          <p>No movies found for "{searchTerm}"</p>
        )}
        <div className="search-results-grid">
          {movieList.map((movie) => (
            <div key={movie.id} className="search-movie-item">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}