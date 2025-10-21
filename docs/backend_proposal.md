# Hakika Backend Proposal

## Overview
The Hakika backend will be a lightweight, scalable API server that powers the decentralized media social network. It integrates seamlessly with ASI:One, Agentverse, and MeTTa for agentic verification, while supporting Web3 authentication and blockchain interactions. Designed for the BGI/BnB Hackathon, it uses Fetch.ai's uAgents framework for agent orchestration and on-chain actions.

## Tech Stack
- **Framework**: Node.js with Express.js (fast prototyping, JavaScript ecosystem).
- **Database**: MongoDB (flexible for posts, users, verification logs; easy scaling).
- **Agent Integration**: Fetch.ai uAgents (Python-based agents for communication and on-chain execution).
- **Blockchain**: Web3.js or Ethers.js for wallet connections and smart contract interactions (e.g., reputation tokens on BNB Chain).
- **APIs**:
  - ASI:One API for content analysis and AI assistance.
  - Agentverse API for agent discovery and collaboration.
  - MeTTa runtime (via Python bindings) for symbolic logic verification.
- **Deployment**: Docker for containerization; deploy to Fetch.ai infrastructure or cloud (e.g., AWS/Heroku for hackathon ease).

## Key Components

### 1. Authentication Module
- Web3 wallet login (MetaMask integration).
- JWT tokens for session management.
- Decentralized identity via DID (optional for advanced).

### 2. Content Management
- RESTful API for posts: Create, read, update, delete.
- Support for niches (sports, fashion) with tagging.
- Media upload (IPFS for decentralized storage).

### 3. Verification Engine
- Agentic Pipeline: Use uAgents to trigger ASI:One analysis and MeTTa checks.
- Consensus Scoring: Aggregate agent votes; store on-chain.
- Real-time Updates: WebSockets for live verification status.

### 4. Agent Orchestration
- uAgents Bureau: Manage agent communication (e.g., fact-checker agents).
- Integration with Agentverse: Register and query agents.
- On-chain Actions: Execute smart contract calls for rewards/penalties.

### 5. Social Features
- Followers/Following: User relationships.
- Likes/Comments: Engagement tracking.
- Gamification: Points/badges from verification participation.

## API Endpoints (Example)
- `POST /auth/login`: Web3 auth.
- `GET /posts?niche=sports`: Fetch verified posts.
- `POST /posts`: Create post with agent trigger.
- `POST /verify`: Manual verification request (calls agents).
- `GET /agents`: List available Agentverse agents.
- `POST /blockchain/reward`: Mint reputation token.

## Code Snippets

### Express Server Setup
```javascript
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/hakika');

app.use(express.json());

// Routes
app.post('/posts', async (req, res) => {
  // Save post and trigger agent verification
  const post = new Post(req.body);
  await post.save();
  // Call agent function
  triggerVerification(post);
  res.status(201).send(post);
});

app.listen(3000, () => console.log('Hakika backend running'));
```

### uAgents Agent Example (Python)
```python
from uagents import Agent, Context
from asi1_api import analyze_content  # Mock ASI:One integration

class FactCheckerAgent(Agent):
    def __init__(self, name):
        super().__init__(name)

    async def verify_post(self, ctx: Context, post_id: str):
        # Fetch post content
        content = get_post_content(post_id)
        # ASI:One analysis
        analysis = analyze_content(content)
        # MeTTa check (simplified)
        is_verified = metta_verify(analysis)
        # Update database
        update_verification(post_id, is_verified)
        # On-chain reward
        if is_verified:
            reward_user_cardano(ctx, post_id)  # Mint token on Cardano

# Register agent
agent = FactCheckerAgent("SportsChecker")
```

### ASI:One Integration
```javascript
const axios = require('axios');

async function analyzeContent(text) {
  const response = await axios.post('https://api.asi1.ai/v1/chat/completions', {
    model: 'asi1-agentic',
    messages: [{ role: 'user', content: `Analyze for misinformation: ${text}` }]
  }, {
    headers: { Authorization: `Bearer ${ASI_ONE_KEY}` }
  });
  return response.data.choices[0].message.content;
}
```

## Integration with Hackathon Tools
- **ASI:One**: Direct API calls for reasoning and content gen.
- **Agentverse**: API for agent SEO and marketplace queries.
- **MeTTa**: Python lib for symbolic proofs (e.g., claim validation).
- **Fetch.ai**: uAgents for agent communication; on-chain via SDK.

## Next Steps
- Set up project structure: `server/` folder with routes, models, agents.
- Implement basic CRUD for posts.
- Prototype agent verification workflow.
- Test integrations with provided APIs.
- Deploy and connect to frontend.

## References
- Fetch.ai Docs: uAgents, Agentverse.
- ASI:One API: https://docs.asi1.ai/
- MeTTa: Symbolic logic runtime.
- BNB Hackathon: On-chain agent focus.
