import { MOVIES_URL } from "./constans";
//const MOVIES_URL = 'https://api.nomoreparties.co';

const checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getAllMovies = () => {
  return fetch(`${MOVIES_URL}/beatfilm-movies`, {
    headers: {
        'Content-Type': 'application/json',
    },
  })
.then(checkResponse)
}