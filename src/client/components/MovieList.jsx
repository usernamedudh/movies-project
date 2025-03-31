import React, { useEffect, useState } from 'react';
import Movie from './Movie';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  // Функция для получения фильмов с сервера
  useEffect(() => {
    fetch('http://localhost:5000/api/movies')  // Указываем адрес нашего API
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Логируем данные, чтобы убедиться, что они приходят
        setMovies(data);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="movies">
      {movies.length ? (
        movies.map((item) => <Movie movie={item} key={item.imdbID} />)
      ) : (
        <h4>Nothing found</h4>
      )}
    </div>
  );
};

export default Movies;
