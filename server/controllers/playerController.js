import Player from '../models/playerModel.js';

const playerController = {
  createPlayer: async (req, res) => {
    try {
      const { nickname, gameHistoryId } = req.body;
      const isExistPlayer = await Player.findOne({ gameHistoryId: gameHistoryId, nickname: nickname });
      if (isExistPlayer) {
        return res.json({
          msg: `Player ${nickname} exists in this quiz, please choose another name`,
        });
      } else {
        const newPlayer = await Player.create({ nickname, gameHistoryId });
        res.json({
          msg: `Player ${nickname} joined the game`,
          players: [...playes, newPlayer],
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatePlayer: async (req, res) => {
    try {
      const { playerId, score } = req.body;
      await Player.findOneAndUpdate({ _id: playerId }, { $set: score });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default playerController;
