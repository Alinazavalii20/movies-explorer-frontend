import React from "react";
import aboutMe from "../../images/aboutMe.png";
import "./AboutMe.css";

function AboutMe() {
    return(
        <>
        <section className="aboutme">
                <h2 className="aboutme__title">Студент</h2>
                <div className="container">
                    <div className="content">
                        <p className="aboutme__name">Лина</p>
                        <p className="aboutme__subtitle">Фронтенд-разработчик, 20 лет</p>
                        <p className="aboutme__description">
                           Я&nbsp;живу в&nbsp;Москве. Люблю слушать музыку и&nbsp;читать, а&nbsp;так&nbsp;же являюсь художником-илюстратором. Недавно начала кодить. 
                           Прошла курс по&nbsp;веб-разработке от Яндекс-Практикума.
                        </p>
                        <nav className="links">
                            <a href="https://t.me/linakaneart" target="_blank" className="links__link">Telegram</a>
                            <a href="https://github.com/Alinazavalii20" target="_blank" className="links__link">Github</a>
                        </nav>
                    </div>
                    <img src={aboutMe} alt="Аватар" className="aboutme__avatar" />
                </div>
            </section>
        </>
    )
}

export default AboutMe;