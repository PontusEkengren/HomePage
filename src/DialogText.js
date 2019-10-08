import React from 'react';
// import * as dialog from './dialog';
import './arrows.css';
import Key from './Key';

export default function DialogText({ data, move, onHandleClick }) {
  return (
    <div className="center">
      <div className="dialog">{data.description}</div>
      {data && data.exits && (
        <div className="arrowKeyNorthSouth">
          {data.exits.map((exit, index) => (
            // <div key={index} onClick={() => }>
            //   {dialog.direction[exit]}
            // </div>

            <Key key={index} arrow={exit} handleClick={onHandleClick}></Key>
          ))}

          {/* <div className="test">
            <i className="arrow up"></i>
            <div>North</div>
          </div>
          <div className="arrowKeyWestEast">
            <div>
              <i className="arrow left"></i> West
            </div>
            <div>South</div>
            <div>
              East <i className="arrow right"></i>
            </div>
          </div>
          <i className="arrow down"></i> */}
        </div>
      )}
    </div>
  );
}
