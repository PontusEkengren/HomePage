import React from 'react';
import './arrows.css';

export default function Key({ arrow, handleClick }) {
  switch (arrow) {
    case 'N':
      return (
        <div className="centerArrow" onClick={() => handleClick('N')}>
          <i className="arrow up"></i>
          <div>North</div>
        </div>
      );
    case 'W':
      return (
        <div className="centerArrow" onClick={() => handleClick('W')}>
          <div>West</div> <i className="arrow left"></i>
        </div>
      );
    case 'E':
      return (
        <div className="centerArrow" onClick={() => handleClick('E')}>
          <div>East</div> <i className="arrow right"></i>
        </div>
      );
    case 'S':
      return (
        <div className="centerArrow" onClick={() => handleClick('S')}>
          <div>South</div>
          <i className="arrow down"></i>
        </div>
      );
    default:
      return null;
  }
}
