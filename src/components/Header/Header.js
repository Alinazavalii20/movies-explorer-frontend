import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import './Header.css';
import headerLogo from '../../images/logo.svg';
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
    return (
        <div className={`header ${!loggedIn ? 'header__main' : ''}`}>
            <Link to="/">
                <img className="header__logo header-main__logo" src={headerLogo} alt="логотип" />
            </Link>
            {!loggedIn && <NavigationAuth />}
            {loggedIn && <Navigation />}
        </div>
    );
};

export default Header;