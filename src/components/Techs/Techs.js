import React from "react";
import "./Techs.css";

function Techs() {
    return(
        <>
        <section className="techs">
                <h2 className="techs__title">Технологии</h2>
                <p className="techs__seven">7 технологий</p>
                <p className="techs__description">
                    На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
                </p>
                <div className="techs__technology">
                    <div className="techs__technology_name">HTML</div>
                    <div className="techs__technology_name">CSS</div>
                    <div className="techs__technology_name">JS</div>
                    <div className="techs__technology_name">React</div>
                    <div className="techs__technology_name">Git</div>
                    <div className="techs__technology_name">Express.js</div>
                    <div className="techs__technology_name">mongoDB</div>
                </div>
        </section>
        </>
    )
}

export default Techs;