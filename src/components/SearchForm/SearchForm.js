import React, { useEffect, useState } from "react";
import "./SearchForm.css"

function SearchForm({ handleGetMovies, filmsTumbler, filmsInputSearch, handleGetMoviesTumbler }) {
  const [inputSearch, setInputSearch] = useState('');
  const [tumbler, setTumbler] = useState(false);

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleTumblerChange() {
    const newTumbler = !tumbler;
    setTumbler(newTumbler);
    handleGetMoviesTumbler(newTumbler);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleGetMovies(inputSearch);
  }

  useEffect(() => {
    setTumbler(filmsTumbler);
    setInputSearch(filmsInputSearch);
  }, [filmsTumbler, filmsInputSearch])

    return(
        <div className="search">
                <div className="search__box">
                    <form className="search__form" autoComplete="off">
                        <div className="search__film">
                          <input
                          className="search__input" 
                          type="search" name="search" 
                          placeholder="Фильм"
                          value={inputSearch || ''} 
                          onChange={handleInputChange}
                          />
                          <button 
                            className="search__button" 
                            type="submit"
                            onClick={handleSubmit}>Найти</button>
                          </div>
                        <div className="search__toggle">
                          <label className="search__tumbler">
                          <input 
                          type="checkbox" 
                          name="duration" 
                          className="search__checkbox"
                          value={tumbler} 
                          checked={tumbler} 
                          onChange={handleTumblerChange}
                          />
                          <span className="search__slider" />
                          </label>
                          <p className="search__films">Короткометражки</p>
                        </div>
                        
                    </form>
                </div>
            </div>
    )
}

export default SearchForm;