import { MAIN_URL } from "./constans";

function onResponce(res) {
  return res.ok ? res.json() : Promise.reject( `Ошибка: ${res}`)
}

export default class MainApi {
    constructor({url}){
        this._url = url;
    }

    get _headers() {
      return {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`, 
      }
    }

    //получение информации о пользователе
    getUserInfo() {
      return fetch(`${this._url}/users/me`,{
          method: 'GET',
          headers: this._headers,
       })
         .then(onResponce)
  }

    //Редактирование профиля
    editUser(user){
        return fetch(`${this._url}/users/me`,{
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: user.name,
            about: user.about
        }),
        })
           .then(onResponce)
    }

    //получение карточек
    getMovies(){
        return fetch(`${this._url}/movies`,{
            method: 'GET',
            headers: this._headers,
        })
            .then(onResponce)
    }

    //Добавление новой карточки
    addMovie(data){
        return fetch(`${this._url}/movies`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(data)
        })
           .then(onResponce)
    }

    deleteMovie(movieId){
        return fetch(`${this._url}/movies/${movieId}`,{
            method: 'DELETE',
            headers: this._headers,
         })
           .then(onResponce)
    }
}


const mainApi = new MainApi({
  url: MAIN_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export {mainApi}