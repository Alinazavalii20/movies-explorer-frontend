import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from "../Footer/Footer";
import PageNotFound from '../PageNotFound/PageNotFound';

import { mainApi } from '../../utils/MainApi';
import * as auth from '../../utils/AuthApi';

import CurrentUserContext from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isTokenChecking, setIsTokenChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const navigate = useNavigate();

//--------------Auth and register-------------------------

  function onRegister(formData) {
    auth.register(formData)
      .then((res) => {
        if (res._id) {
          onLogin(formData);
        }
        navigate('/movies');
      })
      .catch((err) => {console.log(`${err}`)}) 
  }

  function onLogin(formData) {
    auth.authorize(formData)
      .then(({ token }) => {
        if (token) {
          localStorage.setItem("jwt", token);
          navigate('/movies');
          setIsLoggedIn(true);
        }
        navigate('/movies');
      })
      .catch((err) => {console.log(`${err}`)})
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    localStorage.removeItem('movies');
    localStorage.removeItem('filmsTumbler');
    localStorage.removeItem('filmsInputSearch');
    localStorage.removeItem('savedFilms');
    localStorage.removeItem('savedFilmsTumbler');
    localStorage.removeItem('savedFilmsInputSearch');
    navigate("/");
  }

  //-------------Profile------------------------------------

  useEffect(() =>{
    getUserInfo()
  }, []);

  function getUserInfo() {
    mainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true)
      })
      .catch((err) => console.log("ошибка получения данных: " + err))
      .finally(() => {
        setIsLoggedIn(false)
      })
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if(jwt) {
      auth.checkToken()
        .then((user) => {
          setIsLoggedIn(true);
          setIsTokenChecking(false)
          setCurrentUser(user);
        })
        .catch((err) => console.log("ошибка получения данных: " + err));
    } else {
      setIsTokenChecking(false)
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      
      <Routes>
      <Route exact path='/'
          element={
            <>
            <Header loggedIn={isLoggedIn} />
            <Main />
            <Footer />
            </>
          }
        />

        <Route exact path='/movies'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isTokenChecking={isTokenChecking} >
              <Header loggedIn={true} />
              <Movies />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route exact path='/saved-movies'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} isTokenChecking={isTokenChecking} >
              <Header loggedIn={true} />
              <SavedMovies
                   
              />
              <Footer />
            </ProtectedRoute>
          }
        />
        
        <Route exact path='/signup'
          element={
            <Register onRegister={onRegister} />
          }
        />
        
        <Route exact path='/signin'
          element={
            <Login onLogin={onLogin} />
          }
        />
        
        <Route exact path='/profile'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}  isTokenChecking={isTokenChecking} >
              <Header loggedIn={true} />
              <Profile 
                onSignOut={onSignOut}
              />
            </ProtectedRoute>
          }
        />

        <Route exact path='*'
          element={
            <PageNotFound />
          }
        />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
