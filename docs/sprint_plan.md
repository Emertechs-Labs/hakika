# Hakika Agile Sprint Plan

## Overview
Using Scrum practices, we'll structure Hakika's development into 2-week sprints. Focus on MVP for the BGI Hackathon (submission Dec 2025). Team: Assume 1-2 developers; velocity ~20-30 story points/sprint.

### Roles
- **Product Owner**: Oversees backlog, ensures alignment with media integrity objective.
- **Scrum Master/Developer**: Handles sprints, builds code.
- **Stakeholders**: Hackathon judges, community.

### Backlog
Prioritized user stories (MoSCoW: Must, Should, Could, Won't).

#### Must-Have (MVP Core)
- **US1**: As a user, I want to connect my Cardano wallet so I can authenticate securely. (Story Points: 3)
- **US2**: As a content creator, I want to post articles in niches (e.g., sports) so I can share verified media. (Story Points: 5)
- **US3**: As a user, I want agents to verify posts using ASI:One so misinformation is checked. (Story Points: 8)
- **US4**: As a user, I want to view a social feed of verified posts so I can engage with trusted content. (Story Points: 5)
- **US5**: As a fact-checker, I want to participate in gamified verification so I earn reputation. (Story Points: 5)

#### Should-Have
- **US6**: As a user, I want to follow others and see personalized feeds so community grows. (Story Points: 3)
- **US7**: As an agent, I want to integrate MeTTa for symbolic logic checks so verification is robust. (Story Points: 8)
- **US8**: As a user, I want on-chain reputation via Cardano so trust is decentralized. (Story Points: 8)

#### Could-Have
- **US9**: As a user, I want to comment/like posts so social interaction increases. (Story Points: 3)
- **US10**: As an agent, I want to collaborate via Agentverse so niche expertise is leveraged. (Story Points: 5)

## Sprint 1: Foundation (2 weeks, Target: 20 points)
**Goal**: Set up core infrastructure and basic posting/verification.

### Stories
- US1 (3 pts)
- US2 (5 pts)
- US3 (5 pts) - Partial: Basic ASI:One integration
- US4 (5 pts)
- US5 (2 pts) - Basic voting

### Tasks
- Set up React frontend with Vite, Tailwind, Web3 wallet connection (Cardano).
- Create Express backend: Auth endpoint, Post model/schema.
- Implement post creation UI and API.
- Integrate ASI:One for simple analysis (e.g., sentiment check).
- Build feed component with mock data.
- Add voting UI for verification.

### Acceptance Criteria
- Wallet connects successfully.
- Posts created and displayed in feed.
- ASI:One returns basic analysis.
- Voting updates post status.

### Risks
- Wallet integration complexity (mitigate: Use Mesh SDK docs).
- API rate limits (test with mock keys).

## Sprint 2: Enhancement (2 weeks, Target: 25 points)
**Goal**: Add social features, advanced verification, on-chain basics.

### Stories
- US3 (3 pts) - Complete ASI:One + MeTTa
- US6 (3 pts)
- US7 (8 pts)
- US8 (5 pts) - Testnet Cardano minting
- US9 (3 pts)
- US10 (3 pts)

### Tasks
- Enhance verification: Add MeTTa logic in Python agent.
- Implement following/followers in backend/frontend.
- Build personalized feed logic.
- Set up Plutus contract for reputation NFTs (testnet).
- Add comments/likes UI and API.
- Register agents on Agentverse.

### Acceptance Criteria
- Verification includes symbolic checks.
- Feeds personalize based on follows.
- Cardano transaction succeeds.
- Social interactions functional.

### Risks
- MeTTa integration bugs (pair with Agentverse examples).
- Blockchain delays (use testnet).

## Sprint 3: Polish & Demo (1 week, Target: 15 points)
**Goal**: Refine UX, test full flow, prepare hackathon submission.

### Stories
- Refine US4-5 (5 pts)
- Add niche filtering (3 pts)
- Performance optimization (2 pts)
- Demo video/documentation (5 pts)

### Tasks
- UI/UX polish: Responsive design, animations.
- End-to-end testing of agent workflows.
- Optimize for mobile.
- Record demo showcasing verification.

### Acceptance Criteria
- App runs smoothly on desktop/mobile.
- Full verification cycle demonstrated.
- Docs updated for submission.

## General Practices
- **Daily Standups**: 15-min check-ins.
- **Retrospectives**: End-of-sprint improvements.
- **Definition of Done**: Code reviewed, tested, integrated.
- **Tools**: GitHub Issues for stories, Trello/Miro for boards.
- **Metrics**: Burndown charts, defect rates.

## Implementation Docs
For each story, create a sub-doc (e.g., docs/impl_us1.md) with:
- Description
- Wireframes/code snippets
- Dependencies (e.g., ASI:One API key)
- Testing steps

Example for US1:
### US1: Wallet Connection
- **Tech**: Use @meshsdk/react for Cardano.
- **Code**:
```jsx
import { MeshProvider, useWallet } from '@meshsdk/react';

function App() {
  const { connect, wallet } = useWallet();
  return <button onClick={connect}>Connect Wallet</button>;
}
```
- **Test**: Connect Yoroi wallet, verify address.

Start with Sprint 1 aggressively—focus on AGI accuracy with TDD. Prioritize US1 (AGI verification) first!
