import React from "react";
import { Link } from 'react-router-dom'
import './Login.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <div className="login">
        <div className="login__header">
          <Link to="/" className="link__main">
            <img src={logo} className="login__logo" />
          </Link>
            
            <h2 className="login__title">Рады видеть!</h2>
        </div>
        
        <form className="login__form">

            <p className="login__name">E-mail</p>
            <input
              type="email"
              className="login__input"
              name="email"
              placeholder="pochta@yandex.ru|"
              required
            />

            <p className="login__name">Пароль</p>
            <input
              type="password"
              className="login__input"
              name="password"
              placeholder="Пароль"
              required
            />

            <button
              className="login__button"
              type="submit">
              Войти
            </button>
            <div className="login__signup">
               Ещё не зарегистрированы?
              <Link to="/signup" className="login__register-link">
              Регистрация
              </Link>
            </div>
        </form>
    </div>
  );
}

export default Register;