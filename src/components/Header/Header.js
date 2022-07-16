import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import './Header.css';
import headerLogo from '../../images/logo.svg';
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
    return (
        <header className='header'>
            <Routes>
                <Route exact path='/'
                element={
                    <>
                    {!loggedIn &&
                    <>
                    <Link to="/">
                        <img src={headerLogo} className="header__logo header-main__logo" alt="Логотип" />
                    </Link>
                    <NavigationAuth />
                    </>
                    }
                    </>
                }/>
                
                <Route exact path='/movies|saved-movies|profile)'
                element={
                    <>
                    {loggedIn &&
                    <>
                    <Link to="/">
                        <img src={headerLogo} className="header__logo" alt="Логотип" />
                    </Link>
                    <Navigation />
                    </>
                }
                    </>
                }/>

                <Route path="/"
                element = {loggedIn ? <Navigation to="/" /> : <Navigation to="/sign-in" />}
                />

            </Routes>
        </header>
    );
}

export default Header;