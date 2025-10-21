const express = require('express');
const path = require('path');
const Post = require('../models/Post');
const { combinedVerification } = require('../metta_integration');

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { since } = req.query;
    let query = {};
    if (since) {
      query.createdAt = { $gt: new Date(since) };
    }
    const posts = await Post.find(query).sort({ createdAt: -1 });
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
    post.flagged = verification.flagged;
    post.predictiveScore = verification.predictiveScore;
    await post.save();

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
    post.flagged = verification.flagged;
    post.predictiveScore = verification.predictiveScore;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
