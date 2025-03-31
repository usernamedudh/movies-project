// server/models/movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseDate: Date,
  movieType: {
    type: String,
    enum: ['movie', 'serial'],
    required: true,
  },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
