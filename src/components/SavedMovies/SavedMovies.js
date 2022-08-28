import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mainApi } from "../../utils/MainApi";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies() {
  const [movies, setMovies] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [filmsShowed, setFilmsShowed] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);

  async function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    let filterData = [];

    if (tumbler) {
      setFilmsShowedWithTumbler(filmsShowed);
      setFilmsInputSearch(movies)
      setFilmsWithTumbler(movies);
      filterDataShowed = filmsShowed.filter(({ duration }) => duration <= 40);
      filterData = movies.filter(({ duration }) => duration <= 40);
    } else {
      filterDataShowed = filmsShowedWithTumbler;
      filterData = filmsWithTumbler;
    }
    setFilmsShowed(filterDataShowed);
    setMovies(filterData);
  }


  async function handleGetMovies(inputSearch, tumbler) {
    setPreloader(true);
    try {
      const data = movies;
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      if (tumbler) filterData = filterData.filter(({ duration }) => duration <= 40);
      setFilmsShowed(filterData);
    } catch (err) {
      setMovies([]);

    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(movies, saved) {
    if (!saved) {
      try {
        await mainApi.deleteMovie(movies._id);
        const newFilms = await mainApi.getMovies();
        setFilmsShowed(newFilms);
        setMovies(newFilms);
      } catch (err) {
        console.log(`${err}`)
      }
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const localStorageFilms = localStorage.getItem('savedFilms');
    if (localStorageFilms) {
      setMovies(JSON.parse(localStorageFilms));
      const localStorageFilmsTumbler = localStorage.getItem('savedFilmsTumbler');

      if (localStorageFilmsTumbler) {
        setFilmsTumbler(localStorageFilmsTumbler === 'true');
      }


    } else {
      try {
        const data = await mainApi.getMovies();
        setMovies(data);
        setFilmsShowed(data);
      } catch (err) {
        console.log(`${err}`)
      }
    }
  }, []);

  return(
      <div className="saved-movies">
        <SearchForm 
          handleGetMovies={handleGetMovies} 
          filmsTumbler={filmsTumbler}
          filmsInputSearch={filmsInputSearch} 
          handleGetMoviesTumbler={handleGetMoviesTumbler}/>
          {preloader && <Preloader />}
          <MoviesCardList
             filmsRemains={[]} 
             savedMoviesToggle={savedMoviesToggle} 
             movies={filmsShowed}
          />
      </div>
  )
};

export default SavedMovies;