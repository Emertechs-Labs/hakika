const express = require('express');
const { mintReputationToken } = require('../cardano_integration');

const router = express.Router();

// Mint reward endpoint
router.post('/', async (req, res) => {
  try {
    const { walletAddress, score } = req.body;
    const txHash = await mintReputationToken(walletAddress, score);
    res.json({ txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
