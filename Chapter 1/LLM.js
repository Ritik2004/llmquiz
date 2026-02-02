import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

dotenv.config();


const ai = new GoogleGenAI({apiKey:process.env.LLM_KEY});

const history =[];
async function chatting(userProblem){ 

    history.push({
        role:'user',
        parts:[{text:userProblem}]
    })

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: history,
  });

  history.push({
    role:"model",
    parts:[{text:response.text}]
  })
  console.log(response.text);
}

async function main(){
    const userProblem=readlineSync.question("Enter your problem: ");
    await chatting(userProblem);
    main();
}

await main();