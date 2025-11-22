import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
const ai = new GoogleGenAI({apiKey:"AIzaSyDCFuoxsK5o4T_mlfqcYG950C0IvZYrczA"});

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