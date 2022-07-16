import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <div className="page">
      <Routes>
      <Route exact path='/'
          element={
            <>
            <Header loggedIn={false} />
            <Main />
            <Footer />
            </>
          }
        />

        <Route exact path='/movies'
          element={
            <>
            <Header loggedIn={true} />
            <Movies />
            <Footer />
            </>
          }
        />

        <Route exact path='/saved-movies'
          element={
            <>
            <Header loggedIn={true} />
            <SavedMovies />
            <Footer />
            </>
          }
        />
        
        <Route exact path='/signup'
          element={
            <Register />
          }
        />
        
        <Route exact path='/signin'
          element={
            <Login />
          }
        />
        
        <Route exact path='/profile'
          element={
            <>
            <Header loggedIn={true} />
            <Profile />
            </>
          }
        />

        <Route exact path='*'
          element={
            <PageNotFound />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
