// controllers/searchController.js ✅
const Movie = require("../Models/Movies");

const searchMovies = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({ error: "Search query is required." });
    }

    const results = await Movie.find({
      title: { $regex: query, $options: "i" }, // case-insensitive search
    });

    res.json(results);
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { searchMovies };
