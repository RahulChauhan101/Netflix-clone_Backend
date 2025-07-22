const express = require("express");
const router = express.Router();
const Show = require("../Models/showModel");

// POST route to add a new show
router.post("/", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    const savedShow = await newShow.save();
    res.status(201).json(savedShow);
  } catch (err) {
    console.error("Error saving show:", err);
    res.status(500).json({ error: "Failed to save show" });
  }
});

module.exports = router;
