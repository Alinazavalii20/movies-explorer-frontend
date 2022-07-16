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

                <div className="navigation__sidebar">
                    <div className="navigation__container-list">
                        <button className="navigation__close" type="button" onClick={handleToggleMenu}></button>
                        <ul className="navigation__list">
                            <li className="navigation__list-item navigation__list-item_type_main">
                                <Link to="/" className="navigation__link">Главная</Link>
                            </li>
                            <li className="navigation__list-item">
                                <Link to="/movies" className="navigation__link" activeClassName="navigation__link_active">Фильмы</Link>
                            </li>
                            <li className="navigation__list-item">
                                <Link to="/saved-movies" className="navigation__link" activeClassName="navigation__link_active">Сохранённые фильмы</Link>
                            </li>
                        </ul>
                    </div>
                    
                    <Link to="/profile" className="navigation__link navigation__link_type_profile" activeClassName="navigation__link_active">
                        <p className="acount__title">Аккаунт</p>
                        <button className="account__icon"></button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Navigation;