const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  posterUrl: String,
  releaseYear: Number,
  movieLink: String
});

module.exports = mongoose.model('Movie', movieSchema);
