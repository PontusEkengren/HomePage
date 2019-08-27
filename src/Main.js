import React, { useEffect, useState } from 'react';
import './index.css';
import './app.css';
import * as api from './api';
import * as storage from './storage';
import StartScreen from './StartScreen';
import { createSecretKey } from 'crypto';

function Main() {
  const [data, setData] = useState([]);
  const [key, setKey] = useState(null);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(false);
  const [saveFile, setSaveFile] = storage.useLocalStorage('save', undefined);

  useEffect(() => {
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

    setTimeout(() => {
      setTimer(true);
    }, 1850);

    loadGame();
  }, []);

  const handleKeyDown = e => {
    switch (e.keyCode) {
      case 37:
        setKey('W');
        break;
      case 38:
        setKey('N');
        break;
      case 39:
        setKey('E');
        break;
      case 40:
        setKey('S');
        break;
      default:
        setKey(null);
        break;
    }
  };

  console.log('data', key, data);
  if (!data) return <div className="center">Loading..</div>;
  return (
    <div
      className="center"
      style={{ height: '250px' }}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <StartScreen
        started={started}
        data={data}
        timer={timer}
        onStarted={setStarted}
      ></StartScreen>

      {started && <div className="textWindow">{data.description}</div>}
      <div />
    </div>
  );
}

export default Main;
