import { response } from 'express';
import gameHistoryController from './controllers/gameHistoryController.js';
import playerController from './controllers/playerController.js';

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

const socketServer = (socket) => {
  console.log('user connected');

  socket.on('Get_PIN_code_from_server', async (data) => {
    const code = genCode();
    const room = await gameHistoryController.createHistory(data);
    // console.log('roomm', room);
    newGameHistory = { ...room._doc, code };
    listRoom.push({ code, roomId: room._id, players: [] });
    console.log('listRoom', listRoom);
    console.log('newGameHistory', newGameHistory);
    socket.emit('New_game', newGameHistory);
    newGameHistory = {};
  });
  socket.on('Player_send_PIN_code', (code) => {
    const room = listRoom.find((codeRoom) => codeRoom.code === parseInt(code));
    if (room) {
      console.log('rooom', room);
      // gameHistoryController.getHistoryById(room.roomId);
      socket.emit('Player_send_PIN_code', { rightCode: true, roomId: room.roomId });
    } else {
      socket.emit('Player_send_PIN_code', { rightCode: false });
    }
  });
  socket.on('Player_join', async (newPlayerInGame) => {
    const newPlayer = await playerController.createPlayer(newPlayerInGame);
    if (newPlayer.nickname) {
      for (let i = 0; i < listRoom.length; i++) {
        if (listRoom[i].roomId.toString() === newPlayerInGame.gameHistoryId) {
          listRoom[i].players.push(newPlayer);
          socket.broadcast.emit('Get_list_player_response', listRoom[i].players);
          socket.emit('Join_response', `Welcome ${newPlayer.nickname}`);

          console.log('listRoom i', listRoom[i]);
        }
      }
    } else if (newPlayer.msg) {
      socket.emit('Join_response', newPlayer.msg);
    }
  });
  socket.on('Get_list_player', (roomId) => {
    for (let i = 0; i < listRoom.length; i++) {
      if (listRoom[i].roomId.toString() === roomId) {
        socket.emit('Get_list_player_response', listRoom[i].players);
      }
    }
  });
};

export default socketServer;
