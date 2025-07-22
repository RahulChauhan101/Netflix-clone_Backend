const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movies');
const https = require('https');

// ✅ Add Movie
router.post('/', async (req, res) => {
  try {
    const { title, description, posterUrl, releaseYear, movieLink } = req.body;
    const newMovie = new Movie({ title, description, posterUrl, releaseYear, movieLink });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    console.error("❌ Failed to add movie:", err.message);
    res.status(400).json({ error: "Failed to add movie", details: err.message });
  }
});

// ✅ Get All Movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// ✅ Call RapidAPI (moved here from server.js)
router.get('/show', (req, res) => {
  const id = req.query.id;
  console.log("✅ ID from query:", id);

  const options = {
    method: 'GET',
    hostname: 'streaming-availability.p.rapidapi.com',
    path: `/shows/${id}?series_granularity=episode&output_language=en&country=in`,
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
    },
  };

  const request = https.request(options, function (response) {
    const chunks = [];
    response.on('data', chunk => chunks.push(chunk));
    response.on('end', () => {
      try {
        const body = Buffer.concat(chunks).toString();
        res.json(JSON.parse(body));
      } catch (err) {
        res.status(500).json({ error: "Invalid JSON response from API" });
      }
    });
  });

  request.on('error', err => {
    console.error(err);
    res.status(500).json({ error: "API request failed" });
  });

  request.end();
});

module.exports = router;
