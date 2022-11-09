import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import formidable from 'formidable';
import { mkdir, rename } from 'fs/promises';
const app = express();

dotenv.config();

if (!process.env.API_PORT)
  process.exit(1)

// Start listening on port 5000
app.listen(+process.env.API_PORT, () => console.log(`Server running on: ${process.env.CORS_HOST}:${process.env.API_PORT}`))

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CORS_HOST }));

// File upload post route
app.post('/api/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (!('filepath' in files.filetoupload) || !files.filetoupload?.filepath) {
      res.write('Ups! Missing property "filetoupload" file');
      res.end();
      return;
    }
    const filename =  files.filetoupload.originalFilename
    const oldpath = files.filetoupload.filepath
    const newdir = process.cwd() + '/upload/'
    const newpath = newdir + filename
    mkdir(newdir, { recursive: true })
      .then(() => {
        return rename(oldpath, newpath)
      })
      .then(() => {
        console.log('New Upload: ' + filename)
        res.write('File uploaded and moved!');
        res.end();
      })
      .catch((err) => {
        if (err) throw err;
      })
  });
});


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
