import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();


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

    }, [movieId]);



    const handleGoBack = () => {

        console.log("Go back function triggered");
        navigate(-1);  // Goes back to the previous page in the history stack
    };
    return (
        <div>
            {(typeof movie === 'undefined' || movie === null) ?
                (<p>Loading...</p>) :
                (<section className="movie-section">
                    <div className="movie-card">
                      <figure className="movie-image">
                        <img
                          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                          alt={`${movie.title} Poster`}
                        />
                        <figcaption className="movie-figcaption">{movie.title}</figcaption>
                      </figure>
                      <div className="card-content">
                        <header className="movie-header">
                          <h2 className="movie-title">{movie.title}</h2>
                          {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}
                        </header>
                        <p className="movie-overview">{movie.overview}</p>
                        <div className="movie-details">
                          <span className="detail release-date">Release: {movie.release_date}</span>
                          <span className="detail genre">Genre: {movie.genre}</span>
                          <span className="detail rating">Rating: {movie.vote_average} / 10</span>
                        </div>
                        <div className="movie-actions">
                          <button onClick={handleGoBack} className="btn btn-primary">
                            Back to Movies
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>)
            }
        </div>
    );
}

export default MovieDetailsPage;