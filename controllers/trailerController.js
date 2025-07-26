// const Trailer = require("../models/Trailer");

// exports.createTrailer = async (req, res) => {
//   try {
//     const { url, title, description } = req.body;
//     const trailer = new Trailer({ url, title, description });
//     await trailer.save();
//     res.status(201).json(trailer);
//   } catch (err) {
//     res.status(500).json({ message: "Error adding trailer", error: err });
//   }
// };

// exports.getTrailers = async (req, res) => {
//   try {
//     const trailers = await Trailer.find();
//     res.status(200).json(trailers);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching trailers", error: err });
//   }
// };

const Trailer = require("../models/Trailer");

// Create a new trailer
const createTrailer = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const newTrailer = new Trailer({ title, url, description });
    await newTrailer.save();
    res.status(201).json(newTrailer);
  } catch (err) {
    console.error("Error creating trailer:", err);
    res.status(500).json({ error: "Failed to create trailer" });
  }
};

// Get all trailers or filter by query
const getTrailers = async (req, res) => {
  try {
    const query = req.query.query;
    let trailers;

    if (query) {
      trailers = await Trailer.find({
        title: { $regex: query, $options: "i" },
      });
    } else {
      trailers = await Trailer.find();
    }

    res.status(200).json(trailers);
  } catch (err) {
    console.error("Error fetching trailers:", err);
    res.status(500).json({ error: "Failed to fetch trailers" });
  }
};

module.exports = { createTrailer, getTrailers };

