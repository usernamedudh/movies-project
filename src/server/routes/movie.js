// server/routes/movie.js
const express = require('express');
const Movie = require('../models/movie');
const Recommendation = require('../models/recommendation');

const router = express.Router();

// Получение всех фильмов с фильтрацией по типу
router.get('/movies', async (req, res) => {
  const movieType = req.query.movieType || 'movie';
  try {
    const movies = await Movie.find({ movieType });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Получение рекомендаций для пользователя
router.get('/recommendations', async (req, res) => {
  const { userId } = req.query; // Предполагаем, что userId передается через запрос

  try {
    const recommendations = await Recommendation.find({ userId }).populate('movieId');
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
