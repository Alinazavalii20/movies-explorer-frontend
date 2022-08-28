import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard";
import ShowMore from "../ShowMore/ShowMore";

//import { useCurrentWidth, getIntallMovies, getLoadMovies } from "../../hooks/useCurrentMovies";


function MoviesCardList({movies, savedMoviesToggle, saveMovies, filmsRemains, handleMore }) {

/*     const haandleLoadMovies = () => {
        setVisibleMovies((prevLoad) =>prevLoad + getLoadMovies(width));
    }

    const width = useCurrentWidth();
    const [visibleMovies, setVisibleMovies] = useState(getIntallMovies(width)); */
    
    const {pathname} = useLocation();
    
    return(
        <>  
        {movies.length > 0 ? (
            <div className="movies__list">
                {movies
                  /* .slice(0, visibleMovies) */
                  .map((movie) => (
                    <MoviesCard 
                        key={movie.id || movie.movieId} 
                        movie={movie}
                        savedMoviesToggle={savedMoviesToggle}
                        saveMovies={saveMovies}
                     />))
                }
            </div>) : (
                <div className="movies__text-result">Ничего не найдено</div>
            )
        }
         
        {/* visibleMovies < */ /* movies.length && */  filmsRemains.length > 0  && pathname !== '/saved-movies' && (
            <ShowMore handleMore={handleMore}  /* haandleLoadMovies={haandleLoadMovies} */ />)
        }  
        </>
    )
}

export default MoviesCardList;