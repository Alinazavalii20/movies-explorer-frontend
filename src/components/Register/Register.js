import React, { useState } from "react";
import { Link } from 'react-router-dom'
import isEmail from "validator/lib/isEmail";
import './Register.css';
import logo from '../../images/logo.svg';

function Register({ onRegister }) {

  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      if (!isEmail(value)) {
        target.setCustomValidity('Переданы некорректные E-mail');
      } else {
        target.setCustomValidity('');
      }
    }

    setInputValues({ ...inputValues, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(inputValues);
  };

  return (
    <div className="register">
        <div className="register__header">
          <Link to="/" className="link__main">
            <img src={logo} className="register__logo" />
          </Link>
            
            <h2 className="register__title">Добро пожаловать!</h2>
        </div>
        
        <form className="register__form" onSubmit={handleSubmit}>
            <p className="register__name">Имя</p>
            <input
              type="name"
              className="register__input"
              name="name"
              placeholder="Ваше имя"
              value={inputValues.name || ''}
              onChange={handleChange}
              required
            />

            <p className="register__name">E-mail</p>
            <input
              type="email"
              className="register__input"
              name="email"
              placeholder="pochta@yandex.ru"
              value={inputValues.email || ''}
              onChange={handleChange}
              required
            />

            <p className="register__name">Пароль</p>
            <input
              type="password"
              className="register__input"
              name="password"
              placeholder="Пароль"
              value={inputValues.password || ''}
              onChange={handleChange}
              required
            />
            <span id="password-error" className="input-error password-input-error" />

            <button
              className="register__button"
              type="submit"
              onSubmit={handleSubmit}>
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