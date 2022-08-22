import React from "react";
import { Link } from "react-router-dom";
import "./NavigationAuth.css"

function NavigationAuth() {
    return(
        <section className="header__main">
            <div className="header__buttons">
                <Link to='/signup'>
                    <p className="header__register">Регистрация</p>
                </Link>
                <Link to="/signin">
                    <button className="header__login">Войти</button>
                </Link>
            </div>
        </section>
    )
}

export default NavigationAuth;