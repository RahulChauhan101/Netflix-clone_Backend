const Trailer = require("../models/Trailer");

exports.createTrailer = async (req, res) => {
  try {
    const { url, title, description } = req.body;
    const trailer = new Trailer({ url, title, description });
    await trailer.save();
    res.status(201).json(trailer);
  } catch (err) {
    res.status(500).json({ message: "Error adding trailer", error: err });
  }
};

exports.getTrailers = async (req, res) => {
  try {
    const trailers = await Trailer.find();
    res.status(200).json(trailers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching trailers", error: err });
  }
};
