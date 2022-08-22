import { MAIN_URL } from "./constans";

function getResponse(res) {
    return res.status === '200' || '400' || '401'
        ? res.json()
        : Promise.reject(new Error(`Ошибка api: ${res.status}`));
}

export const register = ({name, email, password }) => {
    return fetch(`${MAIN_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(getResponse)
};

export const authorize = ({email, password}) => {
    return fetch(`${MAIN_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(getResponse)
        .then((data) => {
            localStorage.setItem('jwt', data.token);
            return data;
        })
};

export const checkToken = () => {
    return  fetch(`${MAIN_URL}/users/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
    })
        .then(getResponse)
}