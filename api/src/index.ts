import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    const PORT = 3001;

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    server.listen(PORT, () =>
      console.log(`🦅🔥 Server started at: localhost:${PORT}`)
    );

  })
  .catch(() => console.log('Erro ao conectar no mongodb'));

