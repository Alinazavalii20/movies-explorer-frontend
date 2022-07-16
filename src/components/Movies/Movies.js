import React from "react";
import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import movies from "../../utils/Movies";

function Movies() {
    return(
        <section className="movies">
            <SearchForm />
            <MoviesCardList 
              movies={movies}
            />
            <Preloader />
        </section>
    )
}

export default Movies;