import React from "react";
import "./SearchForm.css"

function SearchForm() {
    return(
        <div className="search">
                <div className="search__box">
                    <form className="search__form">
                        <input className="search__input" type="text" name="search" placeholder="Фильм" required />
                        <button className="search__button" type="submit">Найти</button>
                    </form>
                </div>
                <div className="search__toggle">
                    <label className="search__tumbler">
                        <input type="checkbox" className="search__checkbox" />
                        <span className="search__slider" />
                     </label>
                    <p className="search__films">Короткометражки</p>
                 </div>
            </div>
    )
}

export default SearchForm;