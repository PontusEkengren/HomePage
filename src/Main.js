import React, { useEffect, useState } from 'react';
import './index.css';
import './app.css';
import * as api from './api';
import * as storage from './storage';
import StartScreen from './StartScreen';

function Main() {
  const [data, setData] = useState([]);
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

  console.log('data', data);
  if (!data) return <div className="center">Loading..</div>;
  return (
    <div className="center" style={{ height: '250px' }}>
      <StartScreen
        started={started}
        data={data}
        timer={timer}
        onStarted={setStarted}
      ></StartScreen>

      {started && <div className="textWindow">{data.description}</div>}
    </div>
  );
}

export default Main;
