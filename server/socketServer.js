let listCode = [];

const genCode = () => {
  let code = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
  // Nhân với (999999 - 100000 + 1) để có một số ngẫu nhiên từ 0 đến 899999
  // Cộng với 100000 để có một số ngẫu nhiên từ 100000 đến 999999
  if (!listCode.includes(code)) {
    listCode.push(code);
    return code;
  } else {
    return genCode();
  }
};

const socketServer = (socket) => {
  console.log('user connected');
  socket.on('Player_send_PIN_code', (code) => {});
  socket.on('Get_PIN_code_from_server', (callback) => {
    const code = genCode();
    callback(code);
  });
};

export default socketServer;
