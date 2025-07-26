
//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./Routes/movies');
const userRoutes = require('./Routes/users');
const Show = require('./Models/showModel');
const showRoutes = require("./Routes/showRoutes");
const videoRoutes = require('./Routes/videoRoutes');
const trailerRoutes = require("./Routes/trailerRoutes");
const searchRoutes = require("./Routes/searchRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct route path
app.use('/api/movies', movieRoutes);
app.use('/api',searchRoutes)
app.use('/api',videoRoutes)
app.use('/api/users',userRoutes);
app.use('/api',trailerRoutes)
app.use('/api/show', showRoutes); // ✅ Mount POST route


// ✅ Direct GET route for /api/show?id=...
app.get("/api/show", async (req, res) => {
  const id = parseInt(req.query.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const show = await Show.findOne({ id });
    if (!show) return res.status(404).json({ error: "Show not found" });

    res.json(show);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err.message));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
