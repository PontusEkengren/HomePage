import React from 'react';
import './app.css';

export default function TextWindow({ props }) {
  return (
    <div
      className="textWindow"
      style={{
        height: '60px',
        display: 'flex',
        flexDirection: 'column',
      }}
      props
    ></div>
  );
}
