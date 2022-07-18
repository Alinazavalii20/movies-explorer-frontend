import React from "react";
import { Link } from 'react-router-dom'
import './Register.css';
import logo from '../../images/logo.svg';

function Register() {
  return (
    <div className="register">
        <div className="register__header">
          <Link to="/" className="link__main">
            <img src={logo} className="register__logo" />
          </Link>
            
            <h2 className="register__title">Добро пожаловать!</h2>
        </div>
        
        <form className="register__form">
            <p className="register__name">Имя</p>
            <input
              type="name"
              className="register__input"
              name="name"
              placeholder="Виталий"
              required
            />

            <p className="register__name">E-mail</p>
            <input
              type="email"
              className="register__input"
              name="email"
              placeholder="pochta@yandex.ru|"
              required
            />

            <p className="register__name">Пароль</p>
            <input
              type="password"
              className="register__input"
              name="password"
              placeholder="Пароль"
              required
            />
            <span id="password-error" className="input-error password-input-error" />

            <button
              className="register__button"
              type="submit">
              Зарегистрироваться
            </button>
            <div className="register__signin">
              Уже зарегистрированы?
              <Link to="/signin" className="register__login-link">
                Войти
              </Link>
            </div>
        </form>
    </div>
  );
}

export default Register;