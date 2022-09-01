import React from "react";
import { useState, useEffect } from "react";
import "./Movies.css"
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

import { MOVIES_URL } from "../../utils/constans";
import * as moviesApi from '../../utils/MoviesApi';
import { mainApi } from "../../utils/MainApi";
import { addErrorMovies, deleteErrorMovies, searchErrorMovies, messageErrorMovies } from '../../utils/constans';

function Movies({ openPopup }) {

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
    const [errorText, setErrorText] = useState('');
    
    useEffect(() => {
      setMoviesCount(getMoviesCount());
      const handlerResize = () => setMoviesCount(getMoviesCount());
      window.addEventListener('resize', handlerResize);
  
      return () => {
        window.removeEventListener('resize', handlerResize);
      };
    }, []);
  
    function getMoviesCount() {
      let countCards;
      const clientWidth = document.documentElement.clientWidth;
      const MoviesCountConfig = {
        '1200': [12, 3],
        '900': [9, 3],
        '768': [8, 2],
        '240': [5, 2],
      };
  
      Object.keys(MoviesCountConfig)
        .sort((a, b) => a - b)
        .forEach((key) => {
          if (clientWidth > +key) {
            countCards = MoviesCountConfig[key];
          }
        });
  
      return countCards;
    }

    async function handleGetMovies(inputSearch) {
      setFilmsTumbler(false);
      localStorage.setItem('filmsTumbler', false);
  
      if (!inputSearch) {
        setErrorText(searchErrorMovies);
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
        setErrorText(messageErrorMovies);

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

    async function savedMoviesToggle(movies, saved) {
      if (saved) {
        const objMovies = {
          image: `${MOVIES_URL}${movies.image.url}`,
          trailerLink: movies.trailerLink,
          thumbnail: `${MOVIES_URL}${movies.image.url}`,
          movieId: movies.id,
          country: movies.country || 'Неизвестно',
          director: movies.director,
          duration: movies.duration,
          year: movies.year,
          description: movies.description,
          nameRU: movies.nameRU,
          nameEN: movies.nameEN,
        }
        try {
          await mainApi.addMovie(objMovies)
          const newSaved = await mainApi.getMovies()
          setSaveMovies(newSaved)
        } catch (err) {
          console.log('Ошибка', err);
          openPopup(addErrorMovies);
        }
      } else {
        try {
          await mainApi.deleteMovie(movies._id)
          const newSaved = await mainApi.getMovies()
          setSaveMovies(newSaved)
        } catch (err) {
          console.log('Ошибка', err)
          openPopup(deleteErrorMovies);
        }
      }
    }  

    useEffect(() => {
      mainApi
        .getMovies()
        .then((data) => {
          setSaveMovies(data);
        })
        .catch((err) => {
          console.log(`${err}`);
          openPopup(`Ошибка сервера ${err}`);
        });

        const localStorageFilms = localStorage.getItem('movies');

        if (localStorageFilms) {
          const filterData = JSON.parse(localStorageFilms);
          setFilmsShowed(filterData.splice(0, getMoviesCount()[0]));
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
    }, [openPopup])

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
            {errorText && <div className="movies__text-error">{errorText}</div>}
            {!preloader && movies !== null && saveMovies !== null && filmsShowed !== null && (
              <MoviesCardList 
                /* movies={movies} */
                movies={filmsShowed}
                filmsRemains={movies}
                handleMore={handleMore}
                saveMovies={saveMovies}
                savedMoviesToggle={savedMoviesToggle}
            />  
            )}
          
        </section>
    )
}

export default Movies;