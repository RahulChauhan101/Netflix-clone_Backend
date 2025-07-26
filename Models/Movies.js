const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  plot: String,
  fullplot: String,
  poster: String,
  year: Number,
  type: String, // e.g. 'movie' or 'series'
  rated: String,
  released: Date,
  runtime: Number,
  genres: [String],
  cast: [String],
  languages: [String],
  directors: [String],
  awards: Object,
  imdb: Object,
  countries: [String],
  tomatoes: Object,
  lastupdated: String,
  movieLink: String, // optional custom field
});

module.exports = mongoose.model('Movie', movieSchema);
