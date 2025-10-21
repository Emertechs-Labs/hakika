const { spawn } = require('child_process');
const axios = require('axios');

async function verifyWithAGI(content) {
  try {
    const response = await axios.post('https://api.asi1.ai/v1/chat/completions', {
      model: 'asi1-agentic',
      messages: [
        {
          role: 'system',
          content:
            'You are an AGI agent verifying news for misinformation. Respond with JSON: {"isVerified": boolean, "score": number 0-100, "reason": string}'
        },
        { role: 'user', content: `Verify this content: ${content}` }
      ]
    }, {
      headers: { Authorization: `Bearer ${process.env.ASI_ONE_API_KEY}` }
    });

    const parsed = JSON.parse(response.data.choices[0].message.content);
    return parsed;
  } catch (err) {
    console.error('ASI:One verification error:', err.message);
    return { isVerified: false, score: 0, reason: 'Error in AGI verification' };
  }
}

async function verifyWithMeTTa(content) {
  return new Promise((resolve) => {
    const python = spawn('python', ['metta_verify.py', content]);
    let result = '';

    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.on('close', () => {
      try {
        resolve(JSON.parse(result));
      } catch (err) {
        resolve({ verified: false, reason: 'MeTTa error' });
      }
    });
  });
}

let aiMetrics = { totalVerifications: 0, accuracy: 0, responseTimes: [] };

const combinedVerification = async (content) => {
  const start = Date.now();
  const asiResult = await verifyWithAGI(content);
  const mettaResult = await verifyWithMeTTa(content);
  const end = Date.now();

  // Update metrics
  aiMetrics.totalVerifications++;
  aiMetrics.responseTimes.push(end - start);
  if (aiMetrics.responseTimes.length > 100) aiMetrics.responseTimes.shift();  // Keep last 100

  // Proactive: Flag if low score
  const flagged = asiResult.score < 50 || !mettaResult.verified;

  return {
    isVerified: asiResult.isVerified && mettaResult.verified,
    score: (asiResult.score + (mettaResult.verified ? 100 : 0)) / 2,
    reason: `ASI: ${asiResult.reason}, MeTTa: ${mettaResult.reason}`,
    flagged: flagged,
    predictiveScore: Math.max(asiResult.score, mettaResult.verified ? 80 : 20)  // Simple prediction
  };
};

const getAIMetrics = () => {
  const avgResponseTime = aiMetrics.responseTimes.reduce((a, b) => a + b, 0) / aiMetrics.responseTimes.length || 0;
  return {
    totalVerifications: aiMetrics.totalVerifications,
    averageResponseTime: avgResponseTime,
    accuracy: aiMetrics.accuracy  // Placeholder, update with real accuracy tracking
  };
};

module.exports = {
  verifyWithAGI,
  verifyWithMeTTa,
  combinedVerification,
  getAIMetrics
};
