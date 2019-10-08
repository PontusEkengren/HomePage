import React from 'react';
import * as dialog from './dialog';
import Map from './Maze';

export default function DialogText({ data, move, onHandleClick }) {
  return (
    <div className="center">
      <div className="dialog">{data.description}</div>
      {data && data.exits && (
        <div>
          {data.exits.map((exit, index) => (
            <div key={index} onClick={() => onHandleClick(exit)}>
              {dialog.direction[exit]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
