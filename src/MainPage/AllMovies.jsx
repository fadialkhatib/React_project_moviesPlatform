import { React,useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { updateSearchCount } from "../appwrite";





const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}
    
function AllMovies() {

    const [errorMessage, setErrorMessage] = useState(""); 
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovies = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endpoint =
                `${API_BASE_URL}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS); 
            if (!response.ok) {
                throw new Error('Failed to Fetch Movies');
            }
            const data = await response.json();
            console.log(data);

            if (data.Response === 'False') {
                setErrorMessage(data.Error || 'Failed to fetch Movies');
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);

            updateSearchCount();

            } catch (error) {
            console.error(`Error Fetching movies: ${error}`);
            setErrorMessage('Error fetching movies. Please try again later');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect( ()=>{
        fetchMovies();
    },[])

    return (
        <div className="movies-container">
            <h2>All Movies</h2>
            <section className="all-movies">
                {isLoading ? (
                    <p className="text-white">Loading .. </p>
                ) : errorMessage ? (
                        <p className="text-red-500"> { errorMessage}</p>
                    ) : (
                             

                                movieList.map((movie) => (

                                    <div key={movie.id} className="list-movie">
                                        <MovieCard  movie={movie} />
                                        </div>
                                ))
                    )}
                    
            </section>
        </div>
    )
}
export default AllMovies;