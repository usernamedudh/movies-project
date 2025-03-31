// server/models/recommendation.js
const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  reason: String,
});

const Recommendation = mongoose.model('Recommendation', recommendationSchema);

module.exports = Recommendation;
