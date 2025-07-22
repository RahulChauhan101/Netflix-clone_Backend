const Show = require("../Models/showModel");

const getShowById = async (req, res) => {
  const { id } = req.query;
  try {
    const show = await Show.findOne({ showId: id });
    if (!show) return res.status(404).json({ message: "Show not found" });
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getShowById };
