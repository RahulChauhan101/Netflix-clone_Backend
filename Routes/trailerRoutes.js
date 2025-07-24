const express = require("express");
const router = express.Router();
const { createTrailer, getTrailers } = require("../controllers/trailerController");

router.post("/trailers", createTrailer);
router.get("/trailers", getTrailers);

module.exports = router;
