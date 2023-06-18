import React from 'react';
import './WaitingPlayer.scss';

const WaitingPlayer = () => {
  const players = [
    { name: 'player 1', id: 1 },
    { name: 'player 3', id: 3 },
  ];

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
