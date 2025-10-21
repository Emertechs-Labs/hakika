# Testing Guide

## Prerequisites
- MongoDB running locally or via Atlas.
- Node.js, Python installed.
- ASI:One API key in `.env`.
- uAgents: `pip install uagents`.

## Backend Tests
1. Start server: `cd server && node index.js`.
2. Test API with Postman:
   - GET `http://localhost:5000/api/posts` → Should return empty array.
   - POST `http://localhost:5000/api/posts` with JSON:
     ```json
     {
       "title": "Test Post",
       "content": "This is a verified fact.",
       "niche": "sports",
       "author": "TestUser"
     }
     ```
     → Should return post with verified: true, score ~90.
3. Check console for MeTTa/Python spawn logs.

## Frontend Tests
1. Start frontend: `cd frontend && npm run dev`.
2. Open http://localhost:5173.
3. Create post with "verified fact" → Should verify high.
4. Check feed for updated post.

## AGI Verification Tests
- **ASI:One**: Content with "fact" → High score.
- **MeTTa**: Content with "verified fact" → Symbolic match.
- **uAgents**: Run `python agents/verification_agent.py <postId>` manually.

## End-to-End Test
1. Create post via frontend.
2. Backend triggers AGI + uAgent.
3. Refresh feed → Verified status updates.

## Common Issues
- API errors: Check `.env` keys.
- Python errors: Install deps.
- uAgents: Use test seeds.

## Metrics
- Verification accuracy: Manual check scores.
- Response time: <5s for AGI.
