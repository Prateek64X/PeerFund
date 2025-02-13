import OpenAI from "openai";
import { Logger } from "./utils/logger";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the evaluation function
async function evaluateProject(projectName: string, projectDescription: string, amount: number) {
  try {
    // Create a prompt for the OpenAI model
    const prompt = `Evaluate the project proposal for ${projectName}. The project description is: ${projectDescription}. The proposed amount is ${amount}. Assign scores for total, uniqueness, practicality, and cost effectiveness on a scale of 1-10. Return the scores in JSON format.`;

    // Use the OpenAI model to generate the evaluation
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }, 
    });

    // Extract the evaluation from the response
    const evaluation = completion.choices[0].message.content;

    // Parse the evaluation to extract the scores
    const scores = JSON.parse(evaluation || "{}");

    return scores;
  } catch (error) {
    Logger.error("llm", "Failed to evaluate project proposal with OpenAI", {
      error: error instanceof Error ? error.message : String(error),
    });
    return {
      total: 0,
      uniqueness: 0,
      practicality: 0,
      costEffectiveness: 0,
    };
  }
}

// Define the processMessage function
export async function processMessage(message: string): Promise<string> {
  try {
    // Parse the message as JSON
    const { projectName, projectDescription, costEstimate } = JSON.parse(message);

    // Evaluate the project
    const scores = await evaluateProject(projectName, projectDescription, costEstimate);

    // Return the scores as a JSON string
    return JSON.stringify(scores);
  } catch (error) {
    Logger.error("llm", "Failed to process message with OpenAI", {
      error: error instanceof Error ? error.message : String(error),
    });
    return JSON.stringify({
      error: "Sorry, I encountered an error processing your message.",
    });
  }
}