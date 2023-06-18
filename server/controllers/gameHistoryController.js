import GameHistory from '../models/gameHistoryModel.js';

const gameHistoryController = {
  createHistory: async (req, res) => {
    try {
      const { quizId, numberOfPlayers, numberOfQuestions, hostId } = req.body;
      const newGameHistory = await GameHistory.create({ quizId, numberOfPlayers, numberOfQuestions, hostId });
      res.json({
        msg: 'Saved game history',
        gameHistory: newGameHistory._id,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllGameHistories: async (req, res) => {
    try {
      const allGameHistories = await GameHistory.find({ hostId: req.body.user });
      res.json({
        msg: `All game hosted by userId ${req.body.user}`,
        allGameHistories,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getGameHistoryById: async (req, res) => {
    try {
      const gameHistory = await GameHistory.find({ _id: req.body.gameHistoryId });
      res.json({
        msg: `Game history id ${req.body.gameHistoryId}`,
        gameHistory,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
export default gameHistoryController;
