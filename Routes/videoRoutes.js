const express = require("express");
const router = express.Router();
const { createVideo, getVideos } = require("../controllers/videoController");

router.post("/videos", createVideo); // ✅ Must be a function
router.get("/videos", getVideos);

module.exports = router;
