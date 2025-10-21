# API Documentation

## Base URL
`http://localhost:3000/api` (development)

## Authentication
All requests require JWT from Web3 login: `Authorization: Bearer <token>`

## Endpoints

### Auth
- `POST /auth/login`: { walletAddress } → { token }

### Posts
- `GET /posts`: Query params: niche, verified → [{ id, title, content, verified, author }]
- `POST /posts`: { title, content, niche, media? } → { postId }
- `PUT /posts/:id`: Update post
- `DELETE /posts/:id`: Delete post

### Verification
- `POST /verify`: { postId } → Trigger agent verification
- `GET /verify/:postId`: Get status → { status, score }
- `POST /api/agi/suggest`: { content } → { suggestion } (AGI drafting assist)
- `POST /api/reward`: { walletAddress, score } → { txHash } (Mint Cardano token)

### Agents
- `GET /agents`: List Agentverse agents
- `POST /agents/register`: Register custom agent

### Blockchain
- `POST /blockchain/reward`: { userId, amount } → Mint Cardano NFT

### Social
- `POST /follow`: { userId } → Follow user
- `GET /feed`: Personalized feed

## Response Codes
- 200: Success
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Examples
```bash
curl -X GET "http://localhost:3000/api/posts?niche=sports" -H "Authorization: Bearer token"
```

## Rate Limits
10 requests/minute per user.
