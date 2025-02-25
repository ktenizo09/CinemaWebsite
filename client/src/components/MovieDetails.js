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
                            <button onClick={handleGoBack} className="btn btn-primary" >Back to Movies</button>
                        </div>
                    </div>
                </section>)
            }
        </div>
    );
}

export default MovieDetailsPage;