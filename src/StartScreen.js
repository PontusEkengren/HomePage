import React from 'react';
import './app.css';

export default function StartScreen({ started, data, timer, onStarted }) {
  return (
    !started && (
      <div
        className="textWindow"
        style={{
          height: '60px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {data.message}
        {!started && timer && (
          <div
            className="center"
            style={{
              marginTop: '15px',
            }}
            onClick={() => onStarted(true)}
          >
            <div>Start Game</div>{' '}
          </div>
        )}
      </div>
    )
  );
}
