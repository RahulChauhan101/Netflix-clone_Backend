const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  id: Number,
  title: String,
  originalTitle: String,
  releaseYear: Number,
  runtime: Number,
  rating: Number,
  overview: String,
  genres: [{ name: String }],
  directors: [String],
  cast: [String],
  imageSet: {
    verticalPoster: String
  }
});

module.exports = mongoose.model("Show", showSchema);
