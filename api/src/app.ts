import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

interface Message {
  user: string;
  message: string;
  date: string;
}

const messages: Message[] = [];

io.on('connection', (socket) => {
  socket.on('joinChat', (newUser) => {
    socket.emit('previousMessages', messages);
  });

  socket.on('sendMessage', (newMessage) => {
    messages.push(newMessage);

    socket.emit('previousMessages', messages);

    socket.broadcast.emit('receivedMessage', messages);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });

  socket.on;
});

export { server };
