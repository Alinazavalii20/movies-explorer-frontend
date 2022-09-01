const MOVIES_URL = 'https://api.nomoreparties.co';
const MAIN_URL = 'https://api.alina.movies.nomoreparties.sbs'

//registration and auth
export const registerUserSuccessful = 'Вы успешно зарегистрировались!';
export const registerUserError = 'Что - то пошло не так! Ошибка регистрации';
export const authError = 'Что-то пошло не так! Ошибка авторизации.';

//profile
export const profileSuccessful = 'Данные успешно изменены'
export const profileError = 'Что-то пошло не так!'

//movies
export const addErrorMovies = 'Во время добавления фильма произошла ошибка.';
export const deleteErrorMovies = 'Во время удаления фильма произошла ошибка.';

export const searchErrorMovies = 'Нужно ввести ключевое слово!';
export const messageErrorMovies = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const severError = 'Что-то пошло не так! Ошибка сервера';

function handleTimeMovie(minutes) {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60 ;
    const result = hour > 0 ? `${hour}ч ${min}м` : `${min}м`;

    return result;
}

export {MOVIES_URL, MAIN_URL, handleTimeMovie};