const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movies');
const https = require('https');

// ✅ POST: Create new movie
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      poster,
      year,
      released,
      runtime,
      cast,
      genres,
      directors,
      languages,
      rated,
      type,
      movieLink,
    } = req.body;

    const newMovie = new Movie({
      title,
      description,
      poster,
      year,
      released,
      runtime,
      cast,
      genres,
      directors,
      languages,
      rated,
      type,
      movieLink,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    console.error("❌ Failed to save movie:", err.message);
    res.status(500).json({ error: "Failed to create movie", details: err.message });
  }
});

// // ✅ GET: Search movies by title or fetch all
// router.get('/', async (req, res) => {
//   try {
//     const { query } = req.query;
//     const movies = query
//       ? await Movie.find({ title: { $regex: query, $options: 'i' } })
//       : await Movie.find();

//     res.json(movies);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch movies" });
//   }
// });



router.get('/', async (req, res) => {
  try {
    const { query, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const searchFilter = query
      ? { title: { $regex: query, $options: 'i' } }
      : {};

    const [movies, total] = await Promise.all([
      Movie.find(searchFilter).skip(skip).limit(parseInt(limit)),
      Movie.countDocuments(searchFilter),
    ]);

    res.json({ movies, total });
  } catch (err) {
    console.error("❌ Error fetching movies:", err.message);
    res.status(500).json({ error: "Failed to fetch movies", details: err.message });
  }
});



// ✅ GET: Fetch a show from RapidAPI
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
