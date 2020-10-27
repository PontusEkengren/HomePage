import React, { useEffect, useState } from 'react';
import * as api from './api';
import './app.css';

export default function LeaderBoard({ props }) {
  const [leaderBoard, setLeaderBoard] = useState(undefined)

  useEffect(() => {
    const loadLeaderBoard = () => {
      if (!leaderBoard) {
        api.loadLeaderBoard().then(response => {
          console.log('response', response);

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

  // return (
  //   <div
  //   // className="textWindow"
  //   // style={{
  //   //   height: '60px',
  //   //   display: 'flex',
  //   //   flexDirection: 'column',
  //   // }}
  //   // props
  //   >
  //     {leaderBoard.map(score => <div></div>)}

  //   </div>
  // );
}
