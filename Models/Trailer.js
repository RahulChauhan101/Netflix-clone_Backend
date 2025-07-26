const mongoose = require("mongoose");

const trailerSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
});

module.exports = mongoose.model("trailer", trailerSchema);
