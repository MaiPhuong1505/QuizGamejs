import GameHistory from '../models/gameHistoryModel.js';
import Quiz from '../models/quizModel.js';

const gameHistoryController = {
  createHistory: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { quizId, hostId } = data;
        const quiz = await Quiz.findOne({ _id: quizId });
        // console.log('findquiz', quiz);
        const newGameHistory = await GameHistory.create({
          quizId,
          numberOfPlayers: 0,
          numberOfQuestions: quiz.questions.length,
          hostId,
        });
        console.log('history', newGameHistory);
        resolve(newGameHistory);
        // const newGameData = { newGameHistory, code };

        // console.log('newGameHistory', newGameHistory);
      } catch (error) {
        reject(error);
      }
    });
  },
  getHistoryById: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const history = await GameHistory.findOne({ _id: data });
        // console.log('history', history);
        // socket.emit('Get_game', history);
        resolve(history);
        console.log('History', history);
      } catch (error) {
        reject(error);
      }
    });
  },
  // getHistoryByCode: async (socket, data) => {
  //   try {
  //     const history = await GameHistory.findOne({ code: data });
  //     // console.log('history', history);
  //     socket.emit('Get_game', history);
  //     console.log('istory', history);
  //   } catch (error) {
  //     console.log('newGameHistory', error.message);
  //   }
  // },
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
  getGameHistoryByIdAPI: async (req, res) => {
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
