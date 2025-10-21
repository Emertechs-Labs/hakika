# Deployment Guide

## Local Setup
1. Install MongoDB, Node.js, Python.
2. Clone repo: `git clone <url>`.
3. Backend: `cd server && npm install && npm start`.
4. Frontend: `cd frontend && npm install && npm run dev`.
5. Agents: Run `python server/agents/verification_agent.py` separately.

## Environment Variables
- Backend `.env`: `MONGODB_URI`, `ASI_ONE_API_KEY`, `BLOCKFROST_API_KEY`.
- Frontend: None needed.

## Production Deployment
- **Backend**: Heroku/Docker: `docker build -t hakika-backend . && docker run -p 5000:5000 hakika-backend`.
- **Frontend**: Vercel/Netlify: `npm run build && deploy dist/`.
- **Database**: MongoDB Atlas.
- **Agents**: Fetch.ai hosting or local server.

## Testing
- Run `npm test` in backend (add Jest).
- Manual: Create post, check verification, wallet connect.

## Monitoring
- Logs: Console for now; add Winston for production.
- Metrics: Track API calls, verification accuracy.

## Security
- API keys: Use environment variables.
- CORS: Configured for localhost.
- Wallet: No private keys stored.
