import React from "react";
import { useState, useEffect } from "react";
import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

import { MOVIES_URL } from "../../utils/constans";
import * as moviesApi from '../../utils/MoviesApi';
import { mainApi } from "../../utils/MainApi";

function Movies() {

  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState(null);
 
    
    const fetchMovies = () => {
      moviesApi.getAllMovies()
        .then((res) => {
          setMovies(res);
          localStorage.setItem('movies',  JSON.stringify(res));
        })
        .catch((err) => console.log("ошибка получения данных: " + err));
    }
    
    useEffect(() => {
      const localMovies = localStorage.getItem('movies');
      if (localMovies && localMovies.length) {
        try {
          const parseMovies = JSON.parse(localMovies);
          setMovies(parseMovies)
        } catch(err) {
          localStorage.removeItem('movies');
          fetchMovies();
        }
  
      } else {
        fetchMovies();
      }
    }, []);

  //console.log(movies)

    const [preloader, setPreloader] = useState(false);
    const [filmsTumbler, setFilmsTumbler] = useState(false);
    const [filmsInputSearch, setFilmsInputSearch] = useState('');
    const [MoviesCount, setMoviesCount] = useState([]);
    const [filmsShowed, setFilmsShowed] = useState(null);
    const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
    const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);

    async function handleGetMovies(inputSearch) {
      setFilmsTumbler(false);
      localStorage.setItem('filmsTumbler', false);
  
      if (!inputSearch) {
        return false;
      }
  
      setPreloader(true);
  
      try {
        const data = await moviesApi.getAllMovies();
        let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
        localStorage.setItem('movies', JSON.stringify(filterData));
        localStorage.setItem('filmsInputSearch', inputSearch);
  
        const spliceData = filterData.splice(0, MoviesCount[0]);
        setFilmsShowed(spliceData);
        setMovies(filterData);
        setFilmsShowedWithTumbler(spliceData);
        setFilmsWithTumbler(filterData);
      } catch (err) {
        console.log(`${err}`)

        setMovies([]);
        localStorage.removeItem('movies');
        localStorage.removeItem('filmsTumbler');
        localStorage.removeItem('filmsInputSearch');
      } finally {
        setPreloader(false);
      }
    }
    
    async function handleGetMoviesTumbler(tumbler) {
      let filterDataShowed = [];
      let filterData = [];
  
      if (tumbler) {
        setFilmsShowedWithTumbler(filmsShowed);
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

    async function savedMoviesToggle(movie, favorite) {
      if (favorite) {
        const objFilm = {
          image: MOVIES_URL + movie.image.url,
          trailerLink: movie.trailerLink,
          thumbnail:MOVIES_URL + movie.image.url,
          movieId: movie.id,
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
        };
        try {
          await mainApi.addMovie(objFilm);
          const newSaved = await mainApi.getMovies();
          setSaveMovies(newSaved);
        } catch (err) {
          console.log(`${err}`)
        }
      } else {
        try {
          await mainApi.deleteMovie(movie.id);
          const newSaved = await mainApi.getMovies();
          setSaveMovies(newSaved);
        } catch (err) {
          console.log(`${err}`)
        }
      }
    }

    useEffect(() => {
      mainApi
        .getMovies()
        .then((data) => {
          setSaveMovies(data);
        })
        .catch((err) => {console.log(`${err}`)});

        const localStorageFilms = localStorage.getItem('movies');

        if (localStorageFilms) {
          const filterData = JSON.parse(localStorageFilms);
          setMovies(filterData);
          setPreloader(false);
        }

        const localStorageFilmsTumbler = localStorage.getItem('filmsTumbler');
        const localStorageFilmsInputSearch = localStorage.getItem('filmsInputSearch');

        if (localStorageFilmsTumbler) {
          setFilmsTumbler(localStorageFilmsTumbler === 'true');
        }

        if (localStorageFilmsInputSearch) {
          setFilmsInputSearch(localStorageFilmsInputSearch);
        }
    }, [])

    function handleMore() {
      const spliceFilms = movies;
      const newFilmsShowed = filmsShowed.concat(spliceFilms.splice(0, MoviesCount[1]));
      setFilmsShowed(newFilmsShowed);
      setMovies(spliceFilms);
    }

    return(
        <section className="movies">
          <SearchForm 
            handleGetMovies={handleGetMovies} 
            filmsTumbler={filmsTumbler}
            filmsInputSearch={filmsInputSearch} 
            handleGetMoviesTumbler={handleGetMoviesTumbler}/>
            {preloader && <Preloader />}
            {!preloader && movies !== null && saveMovies !== null && filmsShowed !== null && (
              <MoviesCardList 
                movies={movies} 
                handleMore={handleMore}
                saveMovies={saveMovies}
                savedMoviesToggle={savedMoviesToggle}
            />  
            )}
          
        </section>
    )
}

export default Movies;