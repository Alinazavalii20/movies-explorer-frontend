import React from "react";
import "./Promo.css";

function Promo() {
    return(
        <>
        <section className="promo">
            <div className="promo__text">
                <h1 className="promo__title">
                    Учебный проект студента факультета Веб-разработки.
                </h1>
                <p className="promo__subtitle">
                    Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.
                </p>
            </div>
            <button className="promo__button">
                <a href="#about-project" className="promo__button_link">Узнать больше</a>
            </button>
        </section>
        </>
    )
}

export default Promo;