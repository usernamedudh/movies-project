import React from "react";

const MovieDetailModal = ({ movie, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>{movie.Title}</h1>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>Rating:</strong> {movie.imdbRating}</p>
        <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer">
          Link to IMDb
        </a>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white rounded px-4 py-2">
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieDetailModal;
