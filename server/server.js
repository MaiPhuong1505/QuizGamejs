import express from 'express';
import { connectDB } from './database/conn.js';
import userRouter from './routes/userRouter.js';
import cors from 'cors';
import quizRouter from './routes/quizRouter.js';
// import cookieParser from 'cookie-parser';
const app = express();

// app.get('/', (req, res) => {
//   try {
//     res.json('get request');
//   } catch (error) {
//     res.json(error);
//   }
// });
const corsOptions = {
  origin: ['http://localhost:3000'],
};
app.use(express.json());
app.use(cors(corsOptions));
// app.use(cookieParser);
app.use('/api', userRouter);
app.use('/api', quizRouter);

app.listen(5000, () => {
  try {
    connectDB();
  } catch (error) {
    console.log("Can't connect to DB:", error);
  }
  console.log('Server run on port 5000');
});
