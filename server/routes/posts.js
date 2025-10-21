const express = require('express');
const path = require('path');
const Post = require('../models/Post');
const { combinedVerification } = require('../metta_integration');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create post
router.post('/', async (req, res) => {
  try {
    const { title, content, niche, author } = req.body;
    const post = new Post({ title, content, niche, author });
    await post.save();

    // Initial combined AGI verification
    const verification = await combinedVerification(content);
    post.verified = verification.isVerified;
    post.verificationScore = verification.score;
    await post.save();

    // Trigger uAgent for autonomous refinement
    triggerAgentVerification(post._id);

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post (verification updates or edits)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Re-run verification (used by agents)
router.post('/:id/reverify', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const verification = await combinedVerification(post.content);
    post.verified = verification.isVerified;
    post.verificationScore = verification.score;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function triggerAgentVerification(postId) {
  // Spawn uAgent process (async, non-blocking)
  const { spawn } = require('child_process');
  const scriptPath = path.join(__dirname, '..', 'agents', 'verification_agent.py');
  spawn('python', [scriptPath, postId, process.env.AGENT_BACKEND_URL || 'http://localhost:5000'], {
    stdio: 'inherit'
  });
}

module.exports = router;
