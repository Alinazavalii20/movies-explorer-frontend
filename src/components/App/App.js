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
import { registerUserSuccessful, registerUserError, authError} from '../../utils/constans';

import CurrentUserContext from '../../context/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isTokenChecking, setIsTokenChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  /* const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = useState(false); */

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
 

  const navigate = useNavigate();
   
  //-------------Profile------------------------------------
  useEffect(() => {
    if(isLoggedIn) {
      Promise.all([mainApi.getUserInfo()])
      .then(([user]) => {
        setCurrentUser(user);
        console.log(user);
      })
      .catch((err) => console.log("ошибка получения данных: " + err));
    }
  }, [isLoggedIn]);


//--------------Auth and register-------------------------
  useEffect(() => {
    handlTokenCheck()
  }, [])

  // проверка токена
  function handlTokenCheck() {
    const token = localStorage.getItem('token')

    if(token) {
      auth.checkToken(token)
        .then((user) => {
          if(user) {
            setCurrentUser(user)
            setIsTokenChecking(false);
            setIsLoggedIn(true)
          } else {
            setIsLoggedIn(false)
          }
        })
        .catch((err) => {
          console.log('Ошибка при провеке токена ', err);
        });
      }
  };

  // регистрация
  function onRegister(password, email, name) {
    auth.register(password, email, name)
      .then((user) => {
        if(user) {
          setPopupTitle(registerUserSuccessful);
          setIsOpenPopup(true);
          onLogin(password, user.email)
         }
      })
      .catch((err) => {
        setPopupTitle(registerUserError);
        setIsOpenPopup(true);
        console.log("ошибка получения данных: " + err)
    });
  }

  // логирование
  function onLogin(password, email) {
    auth.authorize(password, email)
      .then(res => {
        if(res.token) {
          localStorage.setItem('token', res.token)
          mainApi.updateToken()
          setIsLoggedIn(true)
          handlTokenCheck()
         navigate('/movies')
        } else {
          console.log("ошибка получения данных:");
        }
      })
      .catch((err) => {
        setPopupTitle(authError);
        setIsOpenPopup(true);
        console.log('Ошибка при провеке авторизации ', err)
      })
  };

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser("");
    localStorage.removeItem('movies');
    localStorage.removeItem('filmsTumbler');
    localStorage.removeItem('filmsInputSearch');
    localStorage.removeItem('savedFilms');
    localStorage.removeItem('savedFilmsTumbler');
    localStorage.removeItem('savedFilmsInputSearch');
    navigate("/");
  }

  useEffect(() => {
    if (setIsOpenPopup) {
      function handleEsc(evt) {
        if (evt.key === 'Escape') {
          closePopups();
        }
      }

      document.addEventListener('keydown', handleEsc);
      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isOpenPopup]);

  function closePopups() {
    setIsOpenPopup(false);
    setPopupTitle('');
  }

  function openPopup(textError) {
    setPopupTitle(textError);
    setIsOpenPopup(true);
  }
  
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
                setCurrentUser={setCurrentUser}
                openPopup={openPopup}
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

      <InfoTooltip
          isOpen={isOpenPopup}
          onClose={closePopups}
          text={popupTitle}
        />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
