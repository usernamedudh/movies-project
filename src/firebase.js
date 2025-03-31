// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Импортируем Firestore

// Твоя конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuH9-iD-3owjmaK-P-bYxQ39AgTNum_dw",
  authDomain: "movie-40f27.firebaseapp.com",
  projectId: "movie-40f27",
  storageBucket: "movie-40f27.firebasestorage.app",
  messagingSenderId: "378727284913",
  appId: "1:378727284913:web:806461c90b686abde42290",
  measurementId: "G-K1ZT8XLDG9"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Получение аналитики (если нужно)
const analytics = getAnalytics(app);

// Инициализация Firestore
const db = getFirestore(app); // Инициализируем Firestore

export { app, analytics, db }; // Экспортируем db для использования в других файлах
