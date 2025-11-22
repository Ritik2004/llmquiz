import React from 'react'
import { useState } from 'react'
import Chat from './Chat.jsx'
const ChatArea = () => {
  const [input, setInput] = useState("");
  const [res, setRes] = useState({});
  const[loading,setLoading]=useState(false);
  const sendQuestion = async () => {
   const data = await fetch("http://localhost:3000/data",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ques: input})
   })
   setLoading(true);
   const res = await data.json();
    console.log(res);
    setRes(res);
    setLoading(false);
  }
//   const data = {
//     "success": true,
//     "answer": [
//         {
//             "question": "Which symbol is prominently featured on the flag of Canada?",
//             "options": [
//                 "Star",
//                 "Eagle",
//                 "Maple Leaf",
//                 "Sun"
//             ],
//             "answer": "Maple Leaf"
//         },
//         {
//             "question": "Which country's flag is famously known as the 'Stars and Stripes'?",
//             "options": [
//                 "United Kingdom",
//                 "United States",
//                 "Canada",
//                 "Australia"
//             ],
//             "answer": "United States"
//         },
//         {
//             "question": "What three colors are found on the flag of France?",
//             "options": [
//                 "Red, White, Yellow",
//                 "Blue, White, Red",
//                 "Green, White, Orange",
//                 "Black, Red, Gold"
//             ],
//             "answer": "Blue, White, Red"
//         },
//         {
//             "question": "Which of these flags features a large red circle on a white background?",
//             "options": [
//                 "United Kingdom",
//                 "Japan",
//                 "Germany",
//                 "Brazil"
//             ],
//             "answer": "Japan"
//         },
//         {
//             "question": "The flag of Brazil features a large green field with a yellow diamond. What is inside the yellow diamond?",
//             "options": [
//                 "A star",
//                 "A globe",
//                 "A sun",
//                 "A bird"
//             ],
//             "answer": "A globe"
//         },
        
//     ]
// }
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
       height: "100%",
    backgroundColor: "#6b7280",
    color: "white",
    boxSizing: "border-box"
      
    }}>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        gap: "10px",
          backgroundColor: "#6b7280",
      position: "sticky",
      top: 0,
      zIndex: 10
      }}>
        <input 
          type="text" 
          placeholder='Type your question here...' 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "12px 16px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#374151",
            color: "white",
            fontSize: "16px",
            outline: "none",
            boxSizing: "border-box"
          }}
        />
        <button onClick={sendQuestion} style={{padding: "12px 16px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "white", fontSize: "16px", cursor: "pointer"}} >start</button>
        <button onClick={() => setRes({})} style={{padding: "12px 16px", borderRadius: "8px", border: "none", backgroundColor: "#10b981", color: "white", fontSize: "16px", cursor: "pointer"}}>Play Again</button>
      </div>
    <div style={{
      flex: 1,
      overflowY: "auto",
      padding: "0 20px 20px 20px"
    }}>
      <Chat res={res} loading={loading}/>
    </div>
    </div>
  )
}

export default ChatArea