# Setup Instructions

## Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Python (for uAgents)
- Cardano wallet (Yoroi/Nami)
- Git

## Frontend Setup
1. Unzip `frontend.zip`.
2. `cd frontend`
3. `npm install`
4. `npm run dev` (runs on http://localhost:5173)

## Backend Setup
1. `cd server` (create if not exists)
2. `npm init -y`
3. Install deps: `npm i express mongoose axios web3 dotenv`
4. Set up `.env`: `MONGODB_URI=mongodb://localhost:27017/hakika`, `ASI_ONE_KEY=your_key`
5. `node index.js`

## Agent Setup
1. Install uAgents: `pip install uagents`
2. Create `agents/` folder.
3. Run agents: `python agents/fact_checker.py`

## Blockchain Setup
1. Install Mesh SDK: `npm i @meshsdk/core`
2. Configure Cardano node or use testnet.
3. Deploy Plutus contracts for reputation.

## Testing
- Frontend: Check wallet connection.
- Backend: Test API with Postman.
- Agents: Simulate verification.

## Deployment
- Frontend: Netlify/Vercel.
- Backend: Heroku/AWS.
- Agents: Fetch.ai hosting.

## Troubleshooting
- Unzip issues: Use Python script provided.
- API errors: Check keys in docs.
