import React, { useState } from "react";
import { Link } from 'react-router-dom';
import isEmail from "validator/lib/isEmail";
import './Login.css';
import logo from '../../images/logo.svg';

function Login({onLogin}) {

  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

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

    onLogin(inputValues);
  }
  return (
    <div className="login">
        <div className="login__header">
          <Link to="/" className="link__main">
            <img src={logo} className="login__logo" />
          </Link>
            
            <h2 className="login__title">Рады видеть!</h2>
        </div>
        
        <form className="login__form" onSubmit={handleSubmit}>
            <p className="login__name">E-mail</p>
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

            <p className="login__name">Пароль</p>
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

export default Login;