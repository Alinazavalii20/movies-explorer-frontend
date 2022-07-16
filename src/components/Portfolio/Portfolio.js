import React from "react";
import "./Portfolio.css";
import portfolio from "../../images/portfolio.jpg";

function Portfolio() {
    return(
        <>
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <div className="portfolio-content">
                <a className="portfolio-content__link" href="https://github.com/Alinazavalii20/how-to-learn" target="_blank">Статичный сайт</a>
                <img src={portfolio} className="portfolio-content__logo" alt="Стрелка" />
            </div>

            <div className="portfolio-content">
                <a className="portfolio-content__link" href="https://github.com/Alinazavalii20/russian-travel" target="_blank">Адаптивный сайт</a>
                <img src={portfolio} className="portfolio-content__logo" alt="Стрелка" />
            </div>

            <div className="portfolio-content">
                <a className="portfolio-content__link" href="https://github.com/Alinazavalii20/mesto" target="_blank">Одностраничное приложение</a>
                <img src={portfolio} className="portfolio-content__logo" alt="Стрелка" />
            </div>
        </section>
        </>
    )
}

export default Portfolio;