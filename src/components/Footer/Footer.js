import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className='footer__container'>
                <p className='footer__copyright'>&copy;2022</p>
                <nav className='footer__list-link'>
                    <a className='footer__link' href='https://practicum.yandex.ru' target="_blank">Яндекс.Практикум</a>
                    <a className='footer__link' href='https://github.com/Alinazavalii20' target="_blank">Github</a>
                    <a className='footer__link' href='https://www.facebook.com' target="_blank">Telegram</a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;