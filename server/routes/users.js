const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/:walletAddress', async (req, res) => {
  try {
    const walletAddress = decodeURIComponent(req.params.walletAddress);
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create or get user profile
router.post('/:walletAddress/profile', async (req, res) => {
  try {
    const walletAddress = decodeURIComponent(req.params.walletAddress);
    let user = await User.findOne({ walletAddress });

    if (!user) {
      user = new User({
        walletAddress,
        reputation: 0,
        badges: ["New User"]
      });
      await user.save();
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update reputation/badges (e.g., after verification)
router.post('/:walletAddress/update', async (req, res) => {
  try {
    const walletAddress = decodeURIComponent(req.params.walletAddress);
    const { reputation, badges } = req.body;
    const user = await User.findOneAndUpdate(
      { walletAddress },
      { $inc: { reputation }, $addToSet: { badges: { $each: badges } } },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leaderboard
router.get('/leaderboard/top', async (req, res) => {
  try {
    const users = await User.find().sort({ reputation: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;