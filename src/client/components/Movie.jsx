import React, { useState } from "react";
import * as Api from "../util/Api"; // Ваши утилиты API
import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext"; // Импортируем контекст для добавления фильма в профиль

const Movie = ({ movie }) => {
  const { addMovieToProfile } = useContext(AuthContext);  // Получаем функцию добавления фильма
  const [showDetails, setShowDetails] = useState(false); // Стейт для показа/скрытия информации
  const [movieDetails, setMovieDetails] = useState(null); // Стейт для хранения данных фильма

  // Функция для получения данных о фильме
  const fetchMovieDetails = (imdbID) => {
    Api.getMovieDetails(imdbID) // Запрос к API для получения данных о фильме по imdbID
      .then((data) => {
        setMovieDetails(data); // Сохраняем данные о фильме в стейт
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error); // Обработка ошибки
      });
  };

  // Функция для переключения видимости информации
  const toggleDetails = () => {
    if (!showDetails) {
      fetchMovieDetails(movie.imdbID); // Загружаем информацию о фильме при первом клике
    }
    setShowDetails(!showDetails); // Переключаем отображение подробностей
  };

  // Функция для добавления фильма в профиль
  const handleAddToProfile = (e) => {
    e.stopPropagation(); // Останавливаем всплытие клика
    addMovieToProfile(movie);
    alert(`Movie "${movie.Title}" added to your profile!`);
  };


  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      onClick={toggleDetails} // При клике на картинку показываем информацию
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h6 className="text-xl font-semibold text-gray-800 truncate">{movie.Title}</h6>
        <p className="text-sm text-gray-600 mt-1">Year: {movie.Year}</p>

        {/* Если showDetails true, показываем информацию о фильме */}
        {showDetails && movieDetails && (
          <div className="movie-details mt-4">
            <p><strong>Genre:</strong> {movieDetails.Genre}</p>
            <p><strong>Director:</strong> {movieDetails.Director}</p>
            <p><strong>Actors:</strong> {movieDetails.Actors}</p>
            <p><strong>Plot:</strong> {movieDetails.Plot}</p>
            <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>

            {/* Добавление ссылки для просмотра */}
            <a
              href={`https://www.imdb.com/title/${movieDetails.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4 block"
            >
              Watch on IMDb
            </a>
          </div>
        )}

        {/* Кнопка для добавления фильма в профиль */}
        <button
          onClick={handleAddToProfile}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Add to Profile
        </button>
      </div>
    </div>
  );
};

export default Movie;
