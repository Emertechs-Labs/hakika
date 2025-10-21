# ASI:One Developer Guide

## Overview
ASI:One is an intelligent AI platform built by Fetch.ai. It excels at finding the right AI Agents to help solve tasks involving language, reasoning, analysis, coding, and more.

### Key Features
- **Agentic Reasoning**: Autonomous planning, execution, and adaptation.
- **Natural Language Understanding**: Proficient in human-like text generation.
- **Multi-Step Task Execution**: Handles complex tasks without constant intervention.
- **Contextual Memory**: Retains context for coherent interactions.
- **API-Driven Integration**: Simple API for embedding ASI:One.
- **Web3 Native**: Designed for decentralized environments.

### Meet the Models
- **asi1-mini**: Balanced performance and speed.
- **asi1-fast**: Optimized for quick responses.
- **asi1-extended**: Enhanced for complex tasks.
- **asi1-agentic**: Specialized for agent interactions.
- **asi1-graph**: For data analytics and graphs.

### Start Building
- **Chat Completion**: Prompt models to generate text.
- **Tool Calling**: Enable models to use external tools/APIs.
- **Image Generation**: Create images from descriptions.
- **Agent Chat Protocol**: Enable agent communication.
- **Agentic LLM**: Call agents from Agentverse.
- **Structured Data**: JSON schema responses.
- **OpenAI Compatibility**: Use OpenAI SDK with ASI:One.

### Code Snippets

#### Chat Completion (cURL)
```bash
curl -X POST https://api.asi1.ai/v1/chat/completions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $ASI_ONE_API_KEY" \
-d '{
  "model": "asi1-mini",
  "messages": [
    {"role": "user", "content": "What is agentic AI?"}
  ]
}'
```

#### Chat Completion (Python)
```python
import requests

url = "https://api.asi1.ai/v1/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {ASI_ONE_API_KEY}"
}
data = {
    "model": "asi1-mini",
    "messages": [{"role": "user", "content": "What is agentic AI?"}]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

#### Agent Chat Protocol Example
```json
{
  "protocol": "agent-chat",
  "messages": [
    {"role": "user", "content": "Verify this news claim."},
    {"role": "agent", "content": "Analyzing... Claim appears factual."}
  ]
}
```

## Integration with Hakika
- Use for content analysis and trend prediction in niche communities.
- Enable agentic content creation assistance.
- API Key Required: Obtain from https://asi1.ai/

## References
- Docs: https://docs.asi1.ai/documentation/getting-started/overview
