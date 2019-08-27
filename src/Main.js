import React, { useEffect, useState } from 'react';
import './index.css';
import './app.css';
import * as api from './api';
import * as storage from './storage';
import StartScreen from './StartScreen';

function Main() {
  const [data, setData] = useState([]);
  const [started, setStarted] = useState(false);
  const [saveFile, setSaveFile] = storage.useLocalStorage('save', undefined);

  useEffect(() => loadGame(), []);

  const loadGame = () => {
    if (saveFile) {
      setData(saveFile);
    } else {
      api.loadGame().then(response => {
        setData(response.data);
        setSaveFile(response.data);
      });
    }
  };

  console.log('data', data);
  return (
    <div className="center" style={{ height: '250px' }}>
      <StartScreen started={started} data={data}></StartScreen>
      {!started && (
        <div
          style={{ backgroundColor: 'Start', marginTop: '13px' }}
          onClick={() => setStarted(true)}
        >
          Start Game
        </div>
      )}
      {started && <div>{data.description}</div>}
    </div>
  );
}

export default Main;
