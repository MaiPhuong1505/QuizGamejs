import Player from '../models/playerModel.js';

const playerController = {
  createPlayer: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { nickname, gameHistoryId } = data;
        console.log('gameHistoryId', gameHistoryId);
        const isExistPlayer = await Player.findOne({ gameHistoryId: gameHistoryId, nickname: nickname });
        console.log('isExistPlayer', isExistPlayer);
        if (isExistPlayer) {
          resolve({ msg: `Player ${nickname} exists in this quiz, please choose another name` });
        } else {
          const newPlayer = await Player.create(data);
          resolve(newPlayer);
        }
      } catch (error) {
        console.log('error in player controller', error.message);
        // reject(error);
      }
    });
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
