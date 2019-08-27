import React from 'react';
import './app.css';

export default function StartScreen({ started, data }) {
  return !started && <div className="textWindow">{data.message}</div>;
}
