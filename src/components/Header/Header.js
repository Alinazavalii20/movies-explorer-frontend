import React from "react";
import {  Link } from "react-router-dom";
import './Header.css';
import headerLogo from '../../images/logo.svg';
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn, isLoggedIn }) {
    return (
        <div className={`header ${!loggedIn ? 'header__main ' : ''}`} >
            <Link to="/">
                <img className="header__logo header-main__logo" src={headerLogo} alt="логотип" />
            </Link>
            {isLoggedIn ? '' : loggedIn ? <Navigation /> : <NavigationAuth />}
        </div>
    );
};

export default Header;