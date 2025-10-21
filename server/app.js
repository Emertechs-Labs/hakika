const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const agiRoutes = require('./routes/agi');
const rewardRoutes = require('./routes/reward');
const agentverseRoutes = require('./routes/agentverse');
const userRoutes = require('./routes/users');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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
