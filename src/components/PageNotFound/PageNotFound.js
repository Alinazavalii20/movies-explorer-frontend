import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
    return(
        <section className="error">
            <h2 className="error__title">404</h2>
            <p className="error__subtitle">Страница не найдена</p>

            <button className="error__button">
                <Link className="error__button" to="/">Назад</Link>
            </button>
        </section>
    )
}

export default PageNotFound;