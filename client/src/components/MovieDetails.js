import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import NavLink from "react-bootstrap/esm/NavLink";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

   

    const getMovieDetails = async () => {
        try {
            const resp = await fetch(`/movies/${movieId}`);
            const data = await resp.json();
            console.log(data);
            setMovie(data);
        }
        catch (error) {
            console.log("Error retreiving movie: ", error)
        }

    }

    useEffect(() => {
        getMovieDetails()
    })
    
    return (
        <section className="movie-section">
            <div className="movie-card">
                <figure>
                    <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="movie poster" />
                </figure>
                <div className="card-content">
                    <p className="title">{movie.title}</p>
                    <p className="tagline">{movie.tagline}</p>
                    <p className="overview">{movie.overview}</p>
                    <p className="card-text">{movie.release_date}</p>
                    <p className="card-text">{movie.genre}</p>
                    <p className="card-text">{movie.vote_average} / 10</p>
                    <NavLink to="../" className="back-btn">
                        Go Back
                    </NavLink>
                </div>
            </div>
        </section>
    );
}

export default MovieDetailsPage;