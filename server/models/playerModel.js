import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    gameHistoryId: { type: mongoose.Types.ObjectId, ref: 'GameHistory' },
    nickname: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true },
);

const Player = mongoose.model('Player', playerSchema);

export default Player;
