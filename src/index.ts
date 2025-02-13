import { config as dotenv } from "dotenv";
import express, { Request, Response } from "express";
import { P2PClient } from "../sdk/src/p2p";
import { Message } from "../sdk/src/p2p/types";
import { processMessage } from "./agent";
import { Logger } from "./utils/logger";
import path from "path";

// Load environment variables
dotenv();

// Initialize client variable in broader scope
let client: P2PClient;

// Initialize Express app
const app = express();
app.use(express.json());

async function handleMessage(message: Message) {
  try {
    Logger.info("agent", "Got message", {
      from: message.fromAgentId,
      content: message.content,
    });

    // Process message with LLM
    const response = await processMessage(message.content);

    // Send response back to sender
    await client.sendMessage(message.fromAgentId, response);
  } catch (error) {
    Logger.error("agent", "Failed to handle message", {
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

// HTTP endpoint to evaluate projects
app.post("/api/evaluate", async (req: Request, res: Response) => {
  try {
    const { projectName, projectDescription, costEstimate } = req.body;

    if (!projectName || !projectDescription || !costEstimate) {
      return res.status(400).json({
        error: "projectName, projectDescription, and costEstimate are required",
      });
    }

    // Process the project details
    const response = await processMessage(
      JSON.stringify({ projectName, projectDescription, costEstimate })
    );

    // Send the response
    res.json(JSON.parse(response));
  } catch (error) {
    Logger.error("http", "Failed to evaluate project", {
      error: error instanceof Error ? error.message : String(error),
    });
    res.status(500).json({
      error: "Failed to evaluate project",
    });
  }
});

async function main() {
  try {
    // Initialize logger
    await Logger.init("agent", { useStdout: true });

    const p2pAddress = `localhost:${process.env.GRPC_PORT || "50051"}`;
    const p2pPort = parseInt(process.env.P2P_PORT || "8000");
    const httpPort = parseInt(process.env.HTTP_PORT || "3000");
    const agentId = process.env.AGENT_NAME || "default-agent";

    const p2pNodePath = path.resolve(process.env.P2P_NODE_PATH || "./sdk/p2p-node.js");

    // Initialize P2P client
    client = new P2PClient({
      address: p2pAddress,
      binaryPath: p2pNodePath,
      timeout: 5000,
    });

    // Register message handler before connecting
    client.onMessage(handleMessage);

    // Connect to P2P network
    await client.connect({
      port: p2pPort,
      agentId: agentId,
    });

    // Start HTTP server
    app.listen(httpPort, () => {
      Logger.info("http", "HTTP server started", { port: httpPort });
    });

    Logger.info("agent", "Agent started", {
      agentId,
      p2pAddress,
      httpPort,
    });

    // Handle shutdown
    process.on("SIGINT", async () => {
      Logger.info("agent", "Shutting down");
      await client.disconnect();
      process.exit(0);
    });
  } catch (error) {
    Logger.error("agent", "Failed to start agent", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}

main();