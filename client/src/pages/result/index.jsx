import React from 'react';

const Result = () => {
  return (
    <div className="result">
      <div className="result-inner">
        <div className="result-rank">
          <div className="result-rank-first">
            <div className="player">Player 2</div>
            <div className="player-score">123</div>
          </div>
          <div className="result-rank-second">
            <div className="player">Player 1</div>
            <div className="player-score">123</div>
          </div>
          <div className="result-rank-third">
            <div className="player">Player 3</div>
            <div className="player-score">123</div>
          </div>
        </div>
      </div>
      <div className="result-score">
        <p>Your score is 7562.</p>
        <p>Congratulations!</p>
      </div>
    </div>
  );
};

export default Result;
