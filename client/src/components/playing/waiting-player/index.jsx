import React, { useEffect, useState } from 'react';
import './WaitingPlayer.scss';
import { socket } from '../../../socketClient';

const WaitingPlayer = ({ roomId }) => {
  console.log('in Waiting Player component', roomId);
  // let receivedPlayersList = [];
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    socket.emit('Get_list_player', roomId);
    socket.on('Get_list_player_response', (playerList) => {
      console.log('Get_list_player_response', playerList);
      setPlayers(playerList);
    });
  }, []);

  // useEffect(() => {
  //   socket.on('Get_list_player_response', (playerList) => {
  //     console.log('Get_list_player_response', playerList);
  //     setPlayers(playerList);
  //   });
  // }, []);

  // useEffect(() => {
  //   setPlayers(receivedPlayersList);
  // }, [receivedPlayersList]);

  return (
    <div className="waiting-player">
      <div className="content">
        <div className="player-inner">
          {players.map((player, index) => (
            <div key={index} className="player">
              {player.nickname}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaitingPlayer;
