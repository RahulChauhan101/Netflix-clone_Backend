const express = require("express");
const router = express.Router();
const Trailer = require("../Models/Trailer");

// ✅ Unified GET /trailers with optional search
router.get("/trailers", async (req, res) => {
  const { query } = req.query;

  try {
    let trailers;
    if (query) {
      trailers = await Trailer.find({
        title: { $regex: query, $options: "i" }, // case-insensitive partial match
      });
    } else {
      trailers = await Trailer.find(); // return all if no query
    }

    res.json(trailers);
  } catch (err) {
    console.error("❌ Error fetching trailers:", err.message);
    res.status(500).json({ error: "Failed to fetch trailers" });
  }
});

module.exports = router;
