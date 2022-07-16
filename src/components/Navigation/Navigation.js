import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './Navigation.css';

function Navigation() {
    const [showMenu, setShowMenu] = useState(false);

  const handleToggleMenu = () => setShowMenu(!showMenu);

    return (
        <section className="header__navigation">
            <button className="navigation__menu" type="button" onClick={handleToggleMenu}></button>
            <div className={`navigation__container ${showMenu ? 'navigation__container_visible' : ''}`}>
                <div className="navigation__container-list">
                    <button className="navigation__menu-close" type="button" onClick={handleToggleMenu}></button>
                    <div className="navigation__menu-list">
                        <div className="navigation__movies">
                            <Link to="/" className="nav__movies navigation__main">Главная</Link>
                            <Link to="/movies" className="nav__movies nav__movies_all">Фильмы</Link>
                            <Link  to="/saved-movies" className="nav__movies nav__movies_save">Сохранённые фильмы</Link>
                        </div>

                        <div className="account">
                            <Link to="/profile" className="acount_link">
                                <p className="acount__title">Аккаунт</p>
                                <button className="account__icon"></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navigation;