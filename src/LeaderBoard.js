import React, { useEffect, useState } from 'react';
import * as api from './api';
import './app.css';

export default function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState(undefined)

  useEffect(() => {
    const loadLeaderBoard = () => {
      if (!leaderBoard) {
        api.loadLeaderBoard().then(response => {
          setLeaderBoard(response.data);
        });
      }
    };

    loadLeaderBoard();
  }, [leaderBoard]);


  return (
    <div style={{ marginTop: '40px' }}>
      <h1>Leaderboards</h1>
      {leaderBoard && leaderBoard.map((user, i) => <div key={i}>{`${user.email} ${user.score}`}</div>)}
    </div>
  );
}
