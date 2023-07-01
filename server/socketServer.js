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
    // console.log('newGameHistory', newGameHistory);
    socket.emit('New_game', newGameHistory);
    newGameHistory = {};
    // //player gửi request, server trả về game-history
    // if (Object.keys(data).length === 0) {
    //   socket.on('Player_send_PIN_code', (code) => {
    //     if (listRoom.includes(parseInt(code))) {
    //       socket.emit('Player_send_PIN_code', true);
    //       gameHistoryController.getHistoryByCode(socket, code);
    //     } else {
    //       socket.emit('Player_send_PIN_code', false);
    //     }
    //   });
    // } else {
    //   //host gửi request, server tạo mới 1 game-history
    //   const code = genCode();
    //   gameHistoryController.createHistory(socket, data, code);
    // }
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
          socket.emit('New_player', listRoom[i]);
          console.log('listRoom i', listRoom[i]);
        }
      }
    } else if (newPlayer.msg) {
      socket.emit('Join_response', msg);
    }
  });
};

export default socketServer;
