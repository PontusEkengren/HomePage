import React, { useEffect, useState } from 'react';
import * as api from './api';

export default function LeaderBoard({ users }) {
  const [leaderBoard, setLeaderBoard] = useState(undefined);

  useEffect(() => {
    const loadLeaderBoard = () => {
      if (!leaderBoard) {
        api
          .loadLeaderBoard()
          .then(response => {
            setLeaderBoard(response.data);
          })
          .catch(() => setLeaderBoard([{ email: 'Unable to fetch leaderboard', score: '' }]));
      }
    };

    loadLeaderBoard();
  }, [leaderBoard]);

  return (
    <div style={{ marginTop: '40px' }}>
      <h1>Leaderboard</h1>
      {leaderBoard &&
        leaderBoard.map((user, i) => <div key={i}>{`${user.email} ${user.score}`}</div>)}
    </div>
  );
}
