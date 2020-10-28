import React, { useEffect, useState } from 'react';
import * as api from './api';
import { Leaderboard, LeaderboardHeader, LeaderboardSore } from './Styled/default';
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
      <LeaderboardHeader>Leaderboard</LeaderboardHeader>
      {leaderBoard &&
        leaderBoard.map((user, i) => (
          <Leaderboard key={i}>
            <div>{user.email}</div>
            <LeaderboardSore>{user.score}</LeaderboardSore>
          </Leaderboard>
        ))}
    </div>
  );
}
