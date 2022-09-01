import React, { useEffect } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { MOVIES_URL, handleTimeMovie } from "../../utils/constans";

function MoviesCard({movie, savedMoviesToggle, saveMovies}) {
    const [saved, setSaved] = React.useState(false);
    const { pathname } = useLocation();

    const cardLikeButtonClassName = (`movie__button${saved ? '_save-active' : '_save'}`);

    function handleSavedToogle() {
        const newSaved = !saved;
        const savedMovieCard = saveMovies.filter((obj) => {
            return obj.movieId === movie.id;
        })
        savedMoviesToggle({ ...movie, _id: savedMovieCard.length > 0 ? savedMovieCard[0]._id : null }, newSaved);
    }

    function handleDeleteMovies() {
        savedMoviesToggle(movie, false);
    }

    useEffect(() => {
        if(pathname !== '/saved-movies') {
            const savedMovieCard = saveMovies.filter((obj) => {
                return obj.movieId === movie.id;
            })

            if (savedMovieCard.length > 0) {
                setSaved(true)
            } else {
                setSaved(false)
            }
        }
    }, [pathname, saveMovies, movie.id]);

    return(
        <div className="movie">
            <div className="movie__element">
                <p className="movie__title">{movie.nameRU}</p>
                <p className="movie__duration">{handleTimeMovie(movie.duration)}</p>
            </div>
            <a href={pathname === '/saved-movies' ? movie.trailerLink : movie.trailerLink} target="_blank"  className="movie__link" rel="noreferrer" >
                <img src={pathname === '/saved-movies' ? `${movie.image}` : `${MOVIES_URL}${movie.image.url}`} 
                alt={movie.nameRU}
                className="movie__image" />
            </a>
            <div className="movie__button">
                { pathname === '/saved-movies' ? (
                    <button 
                      type="button" 
                      className="movie__button_delete"
                      onClick={handleDeleteMovies}
                      ></button>
                ) : (
                    <button 
                      type="button" 
                      className={cardLikeButtonClassName}
                      onClick={handleSavedToogle}>Сохранить</button>
                )}      
            </div>
        </div>
    )
}

export default MoviesCard;