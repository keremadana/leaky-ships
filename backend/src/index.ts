import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
const app = express();

dotenv.config();

if (!process.env.API_PORT)
  process.exit(1)

// Start listening on port 5000
app.listen(+process.env.API_PORT, () => console.log(`Server running on: ${process.env.CORS_HOST}:${process.env.API_PORT}`))

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CORS_HOST }));

// Register post route
// app.post('/api/register', () => { });


// - - - - -


import { createServer } from "http";
import { Server } from "socket.io";

const ws = {
  CORS: 'http://localhost:3000',
  PORT: 5001
}
const serverOptions = {
  cors: {
    origin: ws.CORS // React frontend
  }
}

const app2 = express();
const httpServer = createServer(app2);
const io = new Server(httpServer, serverOptions);
httpServer.listen(ws.PORT);

io.on("connection", (socket) => {
  console.log(socket.id)
  // console.log(socket)
  // ...

  socket.on("test", (payload) => {
    console.log("Got test:", payload)
    // ...
  });
  
  socket.emit('test2', 'lol')
});
