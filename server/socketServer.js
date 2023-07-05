import { response } from 'express';
import gameHistoryController from './controllers/gameHistoryController.js';
import playerController from './controllers/playerController.js';
import { PLAYING_PROGRESS } from './utils/constants.js';

let listCode = [];
let listRoom = [];
let newGameHistory = {};

const genCode = () => {
  let code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  // Nhân với (999999 - 100000 + 1) để có một số ngẫu nhiên từ 0 đến 899999
  // Cộng với 100000 để có một số ngẫu nhiên từ 100000 đến 999999
  // console.log('list code general', listRoom);
  if (!listCode.includes(code)) {
    listCode.push(code);
    // console.log('list code', listRoom);
    return code;
  } else {
    return genCode();
  }
};

const socketServer = (socket, io) => {
  console.log('user connected');

  socket.on('Get_PIN_code_from_server', async (data) => {
    const code = genCode();
    const room = await gameHistoryController.createHistory(data);
    // console.log('roomm', room);
    newGameHistory = { ...room._doc, code };
    listRoom.push({ code, roomId: room._id, players: [], hostSocketId: socket.id });
    console.log('listRoom', listRoom);
    // console.log('newGameHistory', newGameHistory);
    socket.emit('New_game', newGameHistory);
    newGameHistory = {};
  });
  socket.on('Player_send_PIN_code', (code) => {
    const room = listRoom.find((codeRoom) => codeRoom.code === parseInt(code));
    if (room) {
      console.log('rooom', room);
      // gameHistoryController.getHistoryById(room.roomId);
      socket.emit('Player_send_PIN_code_response', { rightCode: true, roomId: room.roomId });
    } else {
      socket.emit('Player_send_PIN_code_response', { rightCode: false });
    }
  });
  socket.on('Player_join', async (newPlayerInGame) => {
    const gameHistoryId = newPlayerInGame.gameHistoryId;
    const room = listRoom.find((r) => r.roomId.toString() === gameHistoryId);
    if (room.isLocked) {
      socket.emit('Join_response', `Room is not available`);
    } else {
      const newPlayer = await playerController.createPlayer(newPlayerInGame);
      if (newPlayer?.nickname) {
        room?.players.push(newPlayer);
        socket.join(gameHistoryId.toString());
        io.to(room?.hostSocketId).emit('Get_list_player_response', room?.players);
        const msgString = `Welcome ${newPlayer?.nickname}`;
        socket.emit('Join_response', { player: newPlayer, msg: msgString });
      } else {
        socket.emit('Join_response', newPlayer?.msg);
      }
    }
  });
  socket.on('Get_list_player', (roomId) => {
    const room = listRoom.find((r) => r.roomId.toString() === roomId);
    socket.emit('Get_list_player_response', room.players);
  });
  socket.on('Start_game', (data) => {
    let room;
    listRoom = listRoom.map((r) => {
      if (r.roomId.toString() === data.roomId) {
        room = r;
        return { ...r, isLocked: true, timeToSendQuestion: new Date(Date.now()) };
      }
      return r;
    });

    console.log('room in Start_game', room);
    socket.emit('Start_game_response_for_host', {
      progress: PLAYING_PROGRESS.ANSWER_TIME,
      questionsResponse: data.quiz?.questions,
    });
    const dataForPlayers = {
      progress: PLAYING_PROGRESS.ANSWER_TIME,
      quizResponse: data.quiz,
      questionsResponse: data.quiz?.questions,
      roomId: room.roomId,
    };
    socket.to(room.roomId.toString()).emit('Start_game_response_for_player', dataForPlayers);
    console.log('Start_game', 'server');
  });
  socket.on('Player_selected_answer', (data) => {
    let room = listRoom.find((r) => r.roomId.toString() === data.roomId);
    console.log('room in Player_selected_answer', room);
    const sentData = { ...data, timeToSendQuestion: room.timeToSendQuestion };
    playerController.updatePlayer(sentData);
  });
};

export default socketServer;
