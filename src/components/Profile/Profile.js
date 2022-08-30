import React, { useState } from "react";
import './Profile.css';
import CurrentUserContext from "../../context/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";


function Profile({onSignOut, setCurrentUser}) {
  const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name || '');
    const [lastName, setLastName] = useState(currentUser.name || '');
    const [email, setEmail] = useState(currentUser.email);
    const [lastEmail, setLastEmail] = useState(currentUser.email);
    const [isVisibleButton, setVisibleButton] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        mainApi.editUser({name, email})
          .then((res) => {
            setVisibleButton(false);
            setCurrentUser(res.user)
            setLastName(name);
            setLastEmail(email);
            
            console.log('Данные успешно изменены')
          })
          .catch((err) => {
            console.log(`Что-то пошло не так! ${err}`)
          })
    }

    function handleNameChange(evt) {
        const value = evt.target.value;
        setName(value);
    
        if (value !== lastName) {
          setVisibleButton(true);
        } else {
          setVisibleButton(false);
        }
      }
    
      function handleEmailChange(evt) {
        const value = evt.target.value;
        setEmail(value);
    
        if (value !== lastEmail) {
          setVisibleButton(true);
        } else {
          setVisibleButton(false);
        }
      }

    return (
        <section className="profile">
            <form className="profile__form" onSubmit={handleSubmit}>
                <h3 className="profile__title">{`Привет, ${name}!`}</h3>
                <div className="profile__inputs">
                    <p className="profile__text">Имя</p>
                    <div className="profile__area profile__area_type_name">
                        <input 
                        className="profile__info" 
                        value={name} 
                        onChange={handleNameChange}
                        required />
                    </div>

                    <div className="profile__area profile__area_type_email">
                        <input 
                        className="profile__info" 
                        value={email} 
                        onChange={handleEmailChange}
                        required />
                    </div>
                    <p className="profile__text">E-mail</p>
                </div>

                <button  type='submit' className="profile__edit" disabled={!isVisibleButton}>Редактировать</button>
                <button type='button' className="profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
            </form>
        </section>
    );
}

export default Profile;