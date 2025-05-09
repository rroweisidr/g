const router = require("express").Router();
const User = require("../models/User");

// Leaderboard - this must come BEFORE /:id
router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find().sort({ score: -1 }).limit(10);
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or fetch user by name
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: "Name is required" });

    let user = await User.findOne({ name });
    if (!user) user = await User.create({ name });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user score
router.post("/score", async (req, res) => {
  try {
    const { name, score } = req.body;
    const user = await User.findOneAndUpdate({ name }, { score }, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
