const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const postRoutes = require('./routes/posts');
const agiRoutes = require('./routes/agi');
const rewardRoutes = require('./routes/reward');
const agentverseRoutes = require('./routes/agentverse');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Stricter rate limiting for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'AI API rate limit exceeded.'
});
app.use('/api/agi', aiLimiter);

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hakika')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));
}

app.use('/api/posts', postRoutes);
app.use('/api/agi', agiRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/agentverse', agentverseRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Hakika Backend API'));

module.exports = app;
