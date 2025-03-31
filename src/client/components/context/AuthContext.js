import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]); // Список фильмов

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setSavedMovies([]); // Очищаем фильмы при выходе
  };

  const addMovieToProfile = (movie) => {
    if (!savedMovies.find((m) => m.imdbID === movie.imdbID)) {
      setSavedMovies([...savedMovies, movie]);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, savedMovies, addMovieToProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
