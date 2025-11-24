import React, { useState, useEffect } from 'react';
import Chat from './Chat.jsx';
import {io} from 'socket.io-client';

const socket = io("http://localhost:3000");
socket.on("connect",()=>{
  console.log("Connected to server with ID:", socket.id);
});


const ChatArea = () => {

const [leaderboard, setLeaderboard] = useState([]);
  useEffect(()=>{
   socket.on("room_created",({ roomCode, hostId })=>{
    console.log("Room created:", roomCode);
     setGameCode(roomCode);
     setHostId(hostId);
     setScreen("lobby");
   });

   socket.on("leaderboard_update", (leaderboard) => {
  console.log("Leaderboard updated:", leaderboard);
  setLeaderboard(leaderboard);
  // Optionally show a leaderboard screen
});

   socket.on("player_joined",({ players, hostId })=>{
     console.log("Players in room:", players);
      setHostId(hostId);
     setScreen("lobby");
   });
  socket.on("quiz_start", (quizData) => {
  setRes({ success: true, answer: quizData });
  setScreen("quiz");
});
   socket.on("error",(message)=>{
     alert(message);
   });
},[])

  const [screen, setScreen] = useState("home");  
  // home | solo | create | join | lobby | quiz

  const [input, setInput] = useState("");
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);
  const [hostId,setHostId] = useState(null);
  const [gameCode, setGameCode] = useState("");
  const [code, setCode] = useState("");

  // Generate room code
  const openRoom = () => {
    console.log("Creating room...");
    socket.emit("create_room");
    console.log("Room creation requested");
  };

  // Solo quiz API call
  const sendQuestion = async () => {
    setLoading(true);
    const data = await fetch("http://localhost:3000/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ques: input })
    });
    const res = await data.json();
    setRes(res);
    setLoading(false);
    setScreen("quiz"); // go to quiz screen
  };

  // Join multiplayer lobby
  const joinGame = () => {
     socket.emit("join_room", code);
  };
  return (
    <div style={{ display: "flex",
      flexDirection: "column",
       height: "100%",
    backgroundColor: "#6b7280",
    color: "white",
    boxSizing: "border-box" }}>
      <div 
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "20px",
        gap: "10px",
          backgroundColor: "#6b7280",
      position: "sticky",
      top: 0,
      zIndex: 10,
      overflowX: "auto",
      padding: "10px 0"
      }}
      >
      {/* ---------------- HOME SCREEN ---------------- */}
      {screen === "home" && (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <h1>LLM Quiz Game</h1>
          <button onClick={() => setScreen("solo")}>Play Solo</button>
          <button onClick={() => setScreen("create")}>Create Game</button>
          <button onClick={() => setScreen("join")}>Join Game</button>
        </div>
      )}

      {/* ---------------- SOLO SCREEN ---------------- */}
      {screen === "solo" && (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <input
            type="text"
            value={input}
            placeholder="Ask quiz: e.g., 5 medium questions on India"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={()=>sendQuestion()}>Start Quiz</button>
          <button onClick={() => setScreen("home")}>Back</button>
        </div>
      )}

      {/* ---------------- CREATE ROOM ---------------- */}
      {screen === "create" && (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <button onClick={openRoom}>Generate Game Code</button>
          <button onClick={() => setScreen("home")}>Back</button>
        </div>
      )}

      {/* ---------------- JOIN GAME ---------------- */}
      {screen === "join" && (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <input
            type="text"
            placeholder="Enter Game Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <button onClick={joinGame}>Join</button>
          <button onClick={() => setScreen("home")}>Back</button>
        </div>
      )}

      {/* ---------------- LOBBY SCREEN ---------------- */}
     {screen === "lobby" && (
  <div style={{ textAlign: "center", paddingTop: "40px" }}>
    <h2>Game Code: {gameCode || code}</h2>

    {/* Host will type question prompt */}
    {socket.id === hostId && (   // we will improve later; for now show input always
      <>
        <input
          type="text"
          value={input}
          placeholder="Ask quiz: e.g., 5 questions on India"
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={() => socket.emit("generate_quiz", { roomCode: gameCode, prompt: input })}>
          Generate Quiz
        </button>
      </>
    )}

    <button onClick={() => socket.emit("start_quiz", gameCode)}>
      Start Quiz
    </button>
    
  </div>
)}
    {leaderboard.length > 0 && (
  <div style={{ 
    marginTop: "20px", 
    padding: "20px", 
    backgroundColor: "#374151", 
    borderRadius: "8px" 
  }}>
    <h2 style={{ color: "#10b981" }}>🏆 Live Leaderboard</h2>
    {leaderboard.map((player, index) => (
      <div key={player.playerId} style={{
        padding: "10px",
        margin: "5px 0",
        backgroundColor: index === 0 ? "#fbbf24" : "#4b5563",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <span>#{index + 1} Player {player.playerId.substring(0, 6)}</span>
        <span>{player.score}/{player.total} ({player.percentage}%)</span>
      </div>
    ))}
  </div>
)}

      {/* ---------------- QUIZ SCREEN ---------------- */}
      {screen === "quiz" && (
        <Chat key={JSON.stringify(res)} res={res} loading={loading} socket={socket} gameCode={gameCode || code} />
      )}
</div>
    </div>
  );
};

export default ChatArea;
