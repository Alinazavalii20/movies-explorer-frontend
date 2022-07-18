import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({movie}) {
    const [saved, setSaved] = React.useState(false);

    function handleSavedToogle() {
        setSaved(!saved);
    }
    const { pathname } = useLocation();

    return(
        <div className="movie">
            <div className="movie__element">
                <p className="movie__title">{movie.title}</p>
                <p className="movie__duration">{movie.duration}</p>
                
            </div>
            <img src={movie.image} alt={movie.title} className="movie__image" />
            <div className="movie__button">
                { pathname === '/saved-movies' ? (
                    <button type="button" className="movie__button_delete"></button>
                ) : (
                <button type="button" className={`movie__button${saved ? '_save-active' : '_save'}`} onClick={handleSavedToogle}>Сохранить</button>
                )
                }
                    
            </div>
        </div>
    )
}

export default MoviesCard;