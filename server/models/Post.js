const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  niche: { type: String, enum: ['sports', 'fashion', 'entertainment', 'lifestyle'] },
  author: String,
  verified: { type: Boolean, default: false },
  verificationScore: { type: Number, default: 0 },
  flagged: { type: Boolean, default: false },
  predictiveScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
