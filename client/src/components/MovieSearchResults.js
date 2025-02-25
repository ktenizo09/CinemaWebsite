import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';


const MovieList = () => {
    const [movies, setMovies] = useState([{}])
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');


    const getSearchedMovie = async () => {
        try {
            const resp = await fetch(`/search?query=${query}`);
            const data = await resp.json();
            setMovies(data);
        } catch (error) {
            console.log("Error retreiving list of movies:", error)
        }
    };

    useEffect(() => {
        getSearchedMovie();
    }, [query]);


    return (
        <>
            <div>
                {(typeof movies === 'undefined' || movies === null) ?
                    (<p>Loading...</p>) :
                    (
                        <div className="background_container">
                            <h2>Search Query: <b>{query}</b></h2>
                            <div className="flex-container">
                                {movies.map((movie) => (
                                    <div key={movie.id} className="movie_item">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                            alt="movie poster"
                                            className="movie-poster"
                                        />

                                        <div className="movie_name">
                                            <Link to={`/movies/${movie.id}`} className="movie-link">
                                                {movie.original_title ? movie.original_title : movie.name}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
};
export default MovieList;
