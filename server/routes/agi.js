const express = require('express');
const axios = require('axios');

const router = express.Router();

// AGI suggestion endpoint
router.post('/suggest', async (req, res) => {
  try {
    const { content } = req.body;
    const response = await axios.post('https://api.asi1.ai/v1/chat/completions', {
      model: 'asi1-agentic',
      messages: [
        { role: 'system', content: 'You are an AGI assistant for drafting media content. Provide concise suggestions.' },
        { role: 'user', content: `Improve this draft: ${content}` }
      ]
    }, {
      headers: { Authorization: `Bearer ${process.env.ASI_ONE_API_KEY}` }
    });

    res.json({ suggestion: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
