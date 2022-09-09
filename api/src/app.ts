import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: false,
  },
});

app.use(express.json());

interface Message {
  id: string;
  userId: string;
  message: string;
  date: string;
}

interface IDeleteMessage {
  id: string;
  adminId: string;
}

const messages: Message[] = [];
const deletedMessages: Message[] = [];

app.get('/download', (req, res) => {
  const options = {
    root: path.join(__dirname + '/public/deleted_messages.txt'),
  };

  res.sendFile(options.root);
});

io.on('connection', (socket) => {
  socket.on('joinChat', () => {
    socket.emit('previousMessages', messages);

    io.to(socket.id).emit('sendId', socket.id);
  });

  socket.on('sendMessage', (newMessage) => {
    messages.push(newMessage);

    socket.emit('previousMessages', messages);

    socket.broadcast.emit('receivedMessage', messages);
  });

  socket.on('deleteMessage', (data: IDeleteMessage) => {
    const messageToDelete = messages.find((message) => message.id === data.id);

    if (messageToDelete) {
      const messageIndex = messages.indexOf(messageToDelete);

      messages.splice(messageIndex, 1);

      deletedMessages.push(messageToDelete);

      const deletedMessagesText = `Id do remetente: ${messageToDelete.userId}, Id da mensagem: ${messageToDelete.id}, Menssagem: ${messageToDelete.message}"\n\n`;

      fs.appendFileSync('src/public/deleted_messages.txt', deletedMessagesText);

      io.to(data.adminId).emit('messageDeleted');

      socket.emit('receivedMessage', messages);
      socket.broadcast.emit('receivedMessage', messages);
    } else {
      throw new Error('Message not found');
    }
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });

  socket.on;
});

export { server };
