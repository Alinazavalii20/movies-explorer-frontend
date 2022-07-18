import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import savedMovies from "../../utils/SavedMovies";

function SavedMovies() {
    return(
        <div className="saved-movies">
            <SearchForm />
            <MoviesCardList
            movies={savedMovies} 
            />
        </div>
    )
};

export default SavedMovies;