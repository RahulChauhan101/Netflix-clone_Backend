const express = require("express");
const router = express.Router();
const { getAllVideos } = require("../controllers/videoController");

router.get("/", getAllVideos); // /api/videos

module.exports = router;
