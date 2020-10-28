import React from 'react';
import { TextWindow } from './Styled/default';

export default function StartScreen({ started, data, timer, onStarted }) {
  return (
    !started && (
      <TextWindow>
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
      </TextWindow>
    )
  );
}
