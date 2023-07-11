import express from 'express';
import { connectDB } from './database/conn.js';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import quizRouter from './routes/quizRouter.js';
import questionRouter from './routes/questionRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import socketServer from './socketServer.js';
import historyRouter from './routes/historyRouter.js';

// import cookieParser from 'cookie-parser';
const domain = process.env.DOMAIN || 'http://localhost:3000';
const corsOptions = {
  origin: '*',
};
const app = express();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on('connection', (socket) => {
  socketServer(socket, io);
});

app.use(express.json());
app.use(cors(corsOptions));
// app.use(cookieParser);

app.use('/api', userRouter);
app.use('/api', quizRouter);
app.use('/api', questionRouter);
app.use('/api', categoryRouter);
app.use('/api', historyRouter);

httpServer.listen(5001, () => {
  try {
    console.log('Socket server on');
  } catch (error) {
    console.log("Can't connect socket: ", error);
  }
});
app.listen(5000, () => {
  try {
    connectDB();
  } catch (error) {
    console.log("Can't connect to DB:", error);
  }
  console.log('Server run on port 5000');
});
