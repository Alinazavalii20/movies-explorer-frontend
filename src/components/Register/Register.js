import React, { useState } from "react";
import { Link } from 'react-router-dom'
import isEmail from "validator/lib/isEmail";
import './Register.css';
import logo from '../../images/logo.svg';

function Register({ onRegister }) {

  const [inputValues, setInputValues] = useState({});
  const [isValid, setIsValid] = useState(false);
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
    setIsValid(target.closest('form').checkValidity());
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
              className="form__field"
              name="name"
              placeholder="Ваше имя"
              value={inputValues.name || ''}
              onChange={handleChange}
              required
            />

            <p className="register__name">E-mail</p>
            <input
              type="email"
              className={`form__field ${errors.email ? 'form__field_color-error' : ''}`}
              name="email"
              placeholder="pochta@yandex.ru"
              value={inputValues.email || ''}
              onChange={handleChange}
              required
            />
            <p className={`form__error ${errors.email ? 'form__error-display' : ''}`}>{errors.email}</p>

            <p className="register__name">Пароль</p>
            <input
              type="password"
              className={`form__field ${errors.password ? 'form__field_color-error' : ''}`}
              name="password"
              placeholder="Пароль"
              value={inputValues.password || ''}
              onChange={handleChange}
              required
            />
             <p className={`form__error ${errors.password ? 'form__error-display' : ''}`}>{errors.password}</p>

            <button
              className={`form__button ${isValid ? "" : "form__button_disabled"}`}
              type="submit"
              disabled={!isValid ? true : ''}
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