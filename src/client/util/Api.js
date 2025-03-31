const API_KEY = "e1fe4f87";

// Проверка ответа от сервера
export function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error ${response.status}`);
  }
}

// Получаем данные по ключевым словам и типу (фильмы или сериалы)
export function getSearch(keyWords, type) {
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyWords}${type ? `&type=${type}` : ''}`)
    .then(checkResponse);
}

// Получаем полный список всех фильмов и сериалов
export function getAllMoviesAndSeries() {
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=all`)
    .then(checkResponse);
}
// Получаем полную информацию о фильме по imdbID
export function getMovieDetails(imdbID) {
  return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`)
    .then(checkResponse);
}
