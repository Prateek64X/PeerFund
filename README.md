# PeerFund

PeerFund is a **decentralized crowdfunding platform** powered by **Duck AI Agents**. It verifies projects using AI, scores them based on uniqueness, cost-effectiveness, and practicality, and helps backers make informed funding decisions. 

## Features

- **AI-Driven Project Validation** – DUCK AI Agents analyze projects and assign scores.
- **Decentralized Crowdfunding** – Smart contracts securely manage funds.
- **Transparent Funding Decisions** – AI-generated insights help backers choose wisely.
- **Milestone-Based Payouts** – Funds are released as projects progress.
- **Multi-Chain Support** – Works across different blockchains.

---

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Copy Environment Variables

```bash
cp .env.example .env
```

Set required environment variables:

```bash
AGENT_NAME=peerfund-agent
PRIVATE_KEY=<your-private-key>
OPENAI_API_KEY=<your-openai-api-key>
P2P_NODE_PATH=./sdk/p2p-node.js
P2P_PORT=8000
GRPC_PORT=50051
LOG_TO_CONSOLE=true
```

### 3. Start Your Agent

```bash
pnpm run start
```

### 4. Run the Client

```bash
cd client
npm install
npm start
```

---

## How PeerFund Works

### **1. Project Submission**
Creators submit project details, including objectives, budget, and execution plans.

### **2. AI Validation & Scoring** *(Powered by DUCK AI Agents)*
- **DUCK AI Agents** analyze projects and assign scores based on:
  - **Total Score** (Overall project viability)
  - **Uniqueness** (Is it original or a clone?)
  - **Cost-effectiveness** (Is the budget reasonable?)
  - **Practicality** (Is the idea feasible?)

### **3. Community Verification & Funding**
- AI-generated scores help backers make informed funding choices.
- Once validated, projects enter smart contract-based funding rounds.

### **4. Milestone-Based Payouts**
- Funds are released in phases based on project progress.
- AI agents continue monitoring to prevent misuse of funds.

---

## Customizing AI Agents

Modify `src/agent.ts` to adjust AI behavior:

```typescript
export async function processMessage(content: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an AI specializing in project evaluation..." },
        { role: "user", content },
      ],
      model: "gpt-4",
    });

    return completion.choices[0].message.content || "No response generated";
  } catch (error) {
    return "Error processing request.";
  }
}
```

You can adjust:
- System prompts for AI personality.
- OpenAI model (e.g., `gpt-4`, `gpt-3.5-turbo`).
- Scoring criteria and validation logic.

---

## Contribution

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## License

PeerFund is open-source and licensed under the MIT License.
