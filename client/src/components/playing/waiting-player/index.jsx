import React, { useEffect, useState } from 'react';
import './WaitingPlayer.scss';
import { socket } from '../../../socketClient';

const WaitingPlayer = () => {
  let receivedPlayersList = [];
  const [players, setPlayers] = useState(receivedPlayersList);
  socket.on('New_player', (room) => {
    console.log('New_player', room.players);
    receivedPlayersList = room.players;
  });

  useEffect(() => {
    setPlayers(receivedPlayersList);
  }, receivedPlayersList);

  // const players = [
  //   { name: 'player 1', id: 1 },
  //   { name: 'player 3', id: 3 },
  // ];

  return (
    <div className="waiting-player">
      <div className="content">
        <div className="player-inner">
          {players.map((player, index) => (
            <div key={index} className="player">
              {player.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaitingPlayer;
