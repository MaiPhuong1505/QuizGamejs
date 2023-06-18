import mongoose from 'mongoose';
import { QUIZ_TYPE } from '../utils/constants.js';

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageURL: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/quizgame-e00c9.appspot.com/o/general%2Fquiz.png?alt=media&token=2a95c844-fa10-4ee2-881a-f1ca1523b126',
    },
    type: [{ type: String, default: [QUIZ_TYPE.QUIZ] }],
    visibility: { type: String },
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    questions: [{ type: mongoose.Types.ObjectId, ref: 'Question' }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
