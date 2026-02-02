import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({apiKey:process.env.LLM_KEY});
const QUIZ_SYSTEM_INSTRUCTION = `
You are an AI Quiz Generator.
Your responsibility is to generate quiz questions based on user request.

- ALWAYS reply only in JSON format.
- Each question must have 4 options and 1 correct answer.
- No explanations, no paragraphs, no markdown.

Example format:
[
  {
    "question": "Which country has the largest population?",
    "options": ["India", "China", "USA", "Brazil"],
    "answer": "China"
  }
]
`;
export async function getAnser(inputText) {
  const difficultyLevels = ["easy", "medium", "hard"];
  const difficulty = difficultyLevels.find((d) =>
    inputText.toLowerCase().includes(d)
  ) || "medium";

  const numberMatch = inputText.match(/\d+/);
  const count = numberMatch ? Number(numberMatch[0]) : 5;

  let topic = inputText
    .replace(/\d+/g, "")
    .replace(/easy|medium|hard/gi, "")
    .replace(/give me|questions|question|on|about|generate|make|quiz/gi, "")
    .trim();

  if (!topic) topic = "general knowledge";

  const prompt = `
  Generate ${count} ${difficulty} quiz questions on the topic "${topic}".
  Return ONLY a JSON array as defined.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: { systemInstruction: QUIZ_SYSTEM_INSTRUCTION },
  });

 const raw = response.candidates?.[0]?.content?.parts?.[0]?.text;
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
