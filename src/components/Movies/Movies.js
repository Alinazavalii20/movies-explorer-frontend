import React from "react";
import { useState } from "react";
import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import movies from "../../utils/Movies";
import ShowMore from "../ShowMore/ShowMore";

function Movies() {
    const [isLoading, setIsLoading] = useState(false);

    const handlePreloader = () => {
        setIsLoading(true)
    };

    return(
        <section className="movies">
            <SearchForm />
            <MoviesCardList 
              movies={movies}
            />
            {isLoading ? (<Preloader />) : (
                <ShowMore handlePreloader={handlePreloader}/>
            )}
            
        </section>
    )
}

export default Movies;