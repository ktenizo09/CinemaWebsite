import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchMovies = async (page = 1) => {
        try {
            const resp = await fetch(`/search?query=${query}&page=${page}`);
            const text = await resp.text();
            try {
                const data = JSON.parse(text);
                setMovies(Array.isArray(data.results) ? data.results : []);
                setTotalPages(data.total_pages || 1);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                console.error("Response text:", text);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        if (query) {
            fetchMovies(currentPage);
        }
    }, [query, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    return (
        <>
            <div>

                {(typeof movies === 'undefined' || movies === null) ? (
                    <p>Loading...</p>
                ) : (
                    <div className="background_container">
                         <div className="header">
                            <h2>Search Query: <b>{query}</b></h2>
                            <button onClick={() => navigate('/movies')} className="btn btn-primary">
                                Back to Home
                            </button>
                        </div>
                        <div className="flex-container">
                            {movies.filter(movie => movie.poster_path).map((movie) => (
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
                        <div className="pagination">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default MovieList;