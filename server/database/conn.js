import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const connectDB = async () => {
  await mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected successfully!');
    })
    .catch((err) => {
      throw err;
    });
};

export { connectDB };
