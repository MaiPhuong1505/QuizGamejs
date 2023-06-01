import mongoose from 'mongoose';

const historyByQuestionSchema = new mongoose.Schema(
  {
    gameHistoryId: { type: mongoose.Types.ObjectId, ref: 'GameHistory' },
    questionInQuizId: { type: mongoose.Types.ObjectId, ref: 'QuestionInQuiz' },
    numberOfCorrect: { type: Number, required: true },
    numberOfIncorrect: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const HistoryByQuestion = mongoose.model('HistoryByQuestion', historyByQuestionSchema);

export default HistoryByQuestion;
