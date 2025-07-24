const Video = require("../Models/video")

// POST /api/videos
const createVideo = async (req, res) => {
  try {
    const { url } = req.body;
    const newVideo = new Video({ url });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/videos
const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createVideo, getVideos };
