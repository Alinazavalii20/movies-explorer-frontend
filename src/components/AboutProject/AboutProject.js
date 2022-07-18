import React from "react";
import "./AboutProject.css";

function AboutProject() {
    return(
        <>
        <section className="aboutproject">
            <a name="about-project"></a>
                <h2 className="aboutproject__title">О проекте</h2>

                <div className="aboutproject__description">
                    <div className="aboutproject__diplom">
                        <p className="aboutproject__diplom_title">Дипломный проект включал 5&nbsp;этапов</p>
                        <p className="aboutproject__diplom_subtitle">
                           Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки
                        </p>
                    </div>

                    <div className="aboutproject__diplom">
                        <p className="aboutproject__diplom_title">На выполнение диплома ушло 5 недель</p>
                        <p className="aboutproject__diplom_subtitle">
                           У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </div>
                </div>

                <div className="aboutproject__time">
                    <div className="aboutproject__time_backend">
                        <div className="aboutproject__time_week aboutproject__time_week-back">1 неделя</div>
                        <div className="aboutproject__time_title">Back-end</div>
                    </div>
                    <div className="aboutproject__time_frontend">
                        <div className="aboutproject__time_week aboutproject__time_week-front">4 неделя</div>
                        <div className="aboutproject__time_title">Front-end</div>
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default AboutProject;