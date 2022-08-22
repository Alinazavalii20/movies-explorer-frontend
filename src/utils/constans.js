const MOVIES_URL = 'https://api.nomoreparties.co';
const MAIN_URL = 'https://api.alina.movies.nomoreparties.sbs'

function handleTimeMovie(minutes) {
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60 ;
    const result = hour > 0 ? `${hour}ч ${min}м` : `${min}м`;

    return result;
}

export {MOVIES_URL, MAIN_URL, handleTimeMovie};