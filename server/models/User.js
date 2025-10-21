const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, unique: true },
  reputation: { type: Number, default: 0 },
  badges: [{ type: String }], // e.g., ['Verifier', 'Contributor']
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);