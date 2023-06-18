import mongoose from 'mongoose';

const gameHistorySchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Types.ObjectId, ref: 'Quiz' },
    numberOfPlayers: { type: Number, required: true },
    numberOfQuestions: { type: Number, required: true },
    hostId: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

const GameHistory = mongoose.model('GameHistory', gameHistorySchema);

export default GameHistory;
