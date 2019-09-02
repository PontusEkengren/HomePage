import React from 'react';
import * as dialog from './dialog';

export default function DialogText({ data }) {
  return (
    <div className="center">
      <div>{data.description}</div>
      {data && data.status && (
        <div
          style={{
            marginTop: '35px',
          }}
        >
          {dialog.progress[data.status]}
        </div>
      )}
      {data && data.exits && (
        <div
          style={{
            marginTop: '35px',
          }}
        >
          {data.exits.map((exit, index) => (
            <div key={index}>{dialog.direction[exit]}</div>
          ))}
        </div>
      )}
    </div>
  );
}
