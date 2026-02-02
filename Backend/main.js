import express from 'express';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import dotenv from 'dotenv';
import { getAnser } from './Dsa.js';
import authRoute from './src/routes/authRoutes.js';
import {connectDB} from './src/config/db.js';

connectDB();  
// Load environment variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

console.log('Starting server on port:', PORT);
console.log('Environment:', process.env.NODE_ENV || 'development');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
  {
    origin: ['http://localhost:5173','https://llmquiz-frontend.onrender.com' ],
    methods: ['GET','POST'],
    credentials: true,
    optionsSuccessStatus: 200
  }
));

let rooms = {};
const io = new Server(server,{
  cors:
    {
    origin: ['http://localhost:5173','https://llmquiz-frontend.onrender.com' ],
    methods: ['GET','POST'],
    credentials: true,
    optionsSuccessStatus: 200

  }
})

io.on("connection",(socket)=>{
  console.log(`User connected: ${socket.id}`);
 
  socket.on("create_room",()=>{
    console.log("Creating room for socket:", socket.id);
    const roomCode = Math.random().toString(36).substring(2,7).toUpperCase();
    rooms[roomCode] = {players:[]};//initialize room with empty players array
    socket.join(roomCode);//socket join the room
    rooms[roomCode].players.push(socket.id);//add player to room
    console.log(roomCode);
    socket.emit("room_created",{ roomCode, hostId: socket.id });
    console.log(`Room created with code: ${roomCode}`);
  })

  socket.on("join_room",(roomCode)=>{
    if(rooms[roomCode]){
      socket.join(roomCode);
      rooms[roomCode].players.push(socket.id);
      io.to(roomCode).emit("player_joined", {
  players: rooms[roomCode].players,
  hostId: rooms[roomCode].players[0]  // send host to everyone
});
      console.log(`Player ${socket.id} joined room: ${roomCode}`);
    }
    else{
      socket.emit("error","Room does not exist");
    }
  })


  // In your socket connection handler, add:

socket.on("submit_answer", ({ roomCode, playerId, score, totalQuestions }) => {
  if (!rooms[roomCode].scores) {
    rooms[roomCode].scores = {};
  }
  
  rooms[roomCode].scores[playerId] = {
    score: score,
    total: totalQuestions,
    submittedAt: Date.now()
  };
  
  // Create leaderboard array
  const leaderboard = Object.entries(rooms[roomCode].scores)
    .map(([id, data]) => ({
      playerId: id,
      score: data.score,
      total: data.total,
      percentage: ((data.score / data.total) * 100).toFixed(1)
    }))
    .sort((a, b) => b.score - a.score); // Sort by score descending
  
  // Broadcast leaderboard to all players in room
  io.to(roomCode).emit("leaderboard_update", leaderboard);
  
  console.log(`Player ${playerId} scored ${score}/${totalQuestions} in room ${roomCode}`);
});

  socket.on("generate_quiz", ({ roomCode, prompt }) => {
  rooms[roomCode].prompt = prompt;
  console.log(`Prompt saved for room ${roomCode}: ${prompt}`);
});

  socket.on("start_quiz", async(roomCode)=>{
     const questionPrompt = rooms[roomCode].prompt;
     const quizData = await getAnser(questionPrompt);
     rooms[roomCode].quiz = quizData;

      io.to(roomCode).emit("quiz_start",quizData);
      console.log(`Quiz started in room: ${roomCode}`);
  })


  socket.on("disconnect",()=>{
  console.log("User disconnected");
});

})




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth',authRoute);

app.post('/data', async (req, res) => {
     const value = req.body.ques;
     console.log(value);
    try{
        const answer = await getAnser(value);
        res.json({success:true,answer:answer} );
    }
    catch(err){
        console.log(err);
    }

})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 