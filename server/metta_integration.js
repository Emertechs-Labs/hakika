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

const combinedVerification = async (content) => {
  const asiResult = await verifyWithAGI(content);
  const mettaResult = await verifyWithMeTTa(content);
  return {
    isVerified: asiResult.isVerified && mettaResult.verified,
    score: (asiResult.score + (mettaResult.verified ? 100 : 0)) / 2,
    reason: `ASI: ${asiResult.reason}, MeTTa: ${mettaResult.reason}`
  };
};

module.exports = {
  verifyWithAGI,
  verifyWithMeTTa,
  combinedVerification
};
