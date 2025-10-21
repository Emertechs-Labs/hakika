# BGI Hackathon 2025 Overview

## Hackathon Details
- **Title**: BGI Hackathon 2025 – Build. Grow. Innovate. (Affiliated with Fetch.ai's BNB AI Hack)
- **Description**: Join BGI Hackathon 2025 to build, grow, and innovate with global talent. Learn, hack, and showcase your ideas. Focus on Artificial Super Intelligence (ASI) Challenge - Unlocking Agent Intelligence on BNB Chain.
- **Dates**: February 14, 2025 (Start) to August 14, 2025 (Winners Announcement).
- **Focus**: Build autonomous AI agents using Fetch.ai tech (uAgents, Agentverse, ASI-1) for on-chain actions, aligning with decentralized media integrity.

## Schedule Highlights
- Feb 14: Hackathon Begins (Virtual).
- Feb 25 & Mar 4: Workshops on Fetch.ai and AI Agents on Blockchain.
- May 14 - Jul 14: Submission Period.
- Jul 30: Top 10 Demos.
- Aug 14: Winners Announcement.

## Challenge Statement
Leverage Fetch.ai's agent technology and ASI-1 Mini to build an autonomous AI agent that performs on-chain actions efficiently. Interact with smart contracts, execute transactions, and demonstrate AI-powered decision-making for blockchain operations.

### Key Features to Showcase
- **Agent Interaction**: Autonomous communication with other agents or data sources.
- **On-Chain Execution**: Perform actions like token transfers or contract calls.
- **Smart Contract Integration**: Interact with contracts for tasks (e.g., reputation scoring in Hakika).
- **Autonomy & Intelligence**: Use ASI-1 Mini for reasoning (e.g., optimizing verification processes).

### Example Use Cases
- Agent tracking prices and executing trades.
- Agent optimizing yield farming or, in Hakika's case, verifying news claims on-chain.

## Deliverables
- Functional Fetch.ai agent for on-chain actions.
- Hosted on Agentverse.
- Documentation and demo video.

## Hackpack Resources
- **On-Chain Agent Integration**: Tools for blockchain integration.
- **ASI-1 Mini Integration Examples**: Code for ASI:One usage.
- **Platform for Agentic Economy**: For autonomous agents.
- **Additional**: Guides on uAgents Framework, Fetch.ai SDK, communication, README optimization.

### Code Snippet Example (uAgents Communication)
```python
from uagents import Agent, Bureau, Context, Model

class Message(Model):
    message: str

sigmar = Agent(name="sigmar", seed="sigmar recovery phrase")
slaanesh = Agent(name="slaanesh", seed="slaanesh recovery phrase")

@sigmar.on_interval(period=3.0)
async def send_message(ctx: Context):
    await ctx.send(slaanesh.address, Message(message="hello there slaanesh"))

@sigmar.on_message(model=Message)
async def sigmar_message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")

@slaanesh.on_message(model=Message)
async def slaanesh_message_handler(ctx: Context, sender: str, msg: Message):
    ctx.logger.info(f"Received message from {sender}: {msg.message}")
    await ctx.send(sigmar.address, Message(message="hello there sigmar"))

bureau = Bureau()
bureau.add(sigmar)
bureau.add(slaanesh)

if __name__ == "__main__":
    bureau.run()
```

### Code Snippet Example (ASI-1 Mini)
```javascript
const response = await fetch('https://api.asi1.ai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.ASI_ONE_API_KEY}`
  },
  body: JSON.stringify({
    model: 'asi1-mini',
    messages: [{ role: 'user', content: 'Verify if this sports claim is accurate.' }]
  })
});
const data = await response.json();
console.log(data.choices[0].message.content);
```

## References
- Official Site: https://bgihackathon.com/
- Hackpack: https://fetch.ai/events/hackathons/bnb-hackathon-2025/hackpack
- Theme Alignment: Build decentralized solutions for authentic journalism using agents and Web3.
