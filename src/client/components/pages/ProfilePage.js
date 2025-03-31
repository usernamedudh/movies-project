import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout, savedMovies } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <p>You are not logged in</p>;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Выйти</button>

      <h3>Saved Movies:</h3>
      <ul>
        {savedMovies.length > 0 ? (
          savedMovies.map((movie) => (
            <li key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} width="50" />
              {movie.Title} ({movie.Year})
            </li>
          ))
        ) : (
          <p>No movies saved</p>
        )}
      </ul>
    </div>
  );
};

export default ProfilePage;
