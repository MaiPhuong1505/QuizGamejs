import GameHistory from '../models/gameHistoryModel.js';
import Player from '../models/playerModel.js';
import { MAX_SCORE } from '../utils/constants.js';

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
          await GameHistory.findOneAndUpdate({ _id: gameHistoryId }, { $inc: { numberOfPlayers: 1 } }, { new: true });
          resolve(newPlayer);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  updatePlayer: async (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { playerId, answerSelected, timeToAnswer, timeToSendQuestion, maxTime } = data;
        if (answerSelected?.isCorrect) {
          const tAnswer = new Date(timeToAnswer);
          const tStart = new Date(timeToSendQuestion);
          const timeDiff = tAnswer.getTime() - tStart.getTime();
          const maxTimeMs = maxTime * 1000;
          const score = Math.round(MAX_SCORE - (MAX_SCORE / maxTimeMs) * timeDiff);
          console.log('score', playerId, score);
          const updatedPlayer = await Player.findOneAndUpdate(
            { _id: playerId },
            { $inc: { score: score } },
            { new: true },
          );
          resolve(updatedPlayer);
        } else {
          console.log('wrong answer');
          const getPlayer = await Player.findOne({ _id: playerId });
          resolve(getPlayer);
        }
      } catch (error) {
        reject(error);
        console.log(error.message);
      }
    });
  },
  getTopPlayersInHistory: async (historyId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const players = await Player.find({ gameHistoryId: historyId }).sort({ score: 'desc' }).exec();
        if (players.length > 3) {
          resolve(players.slice(0, 3));
        } else {
          resolve(players);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default playerController;
