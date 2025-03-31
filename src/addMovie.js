// src/addMovie.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Импортируем конфигурацию Firebase

const addMovie = async (movie) => {
  try {
    const docRef = await addDoc(collection(db, "movies"), {
      title: movie.title,
      director: movie.director,
      releaseYear: movie.releaseYear,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Пример вызова функции:
addMovie({
  title: "Inception",
  director: "Christopher Nolan",
  releaseYear: 2010,
});
