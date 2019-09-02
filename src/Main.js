import React, { useEffect, useState } from 'react';
import './index.css';
import './app.css';
import * as api from './api';
import * as storage from './storage';
import StartScreen from './StartScreen';
import DialogText from './DialogText';

function Main() {
  const [data, setData] = useState([]);
  const [key, setKey] = useState('UNDEFINED');
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
    var choice = null;

    switch (e.keyCode) {
      case 37:
        choice = 'W';
        break;
      case 38:
        choice = 'N';
        break;
      case 39:
        choice = 'E';
        break;
      case 40:
        choice = 'S';
        break;
      default:
        choice = null;
        break;
    }

    setKey(choice);

    if (choice && choice !== 'UNDEFINED') {
      const handleMove = direction => {
        api
          .move(data, direction)
          .then(response => console.log('move:', response))
          .catch(err => console.log('err: ', err));
      };

      handleMove(choice);
    }
  };

  console.log('data', data);
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

      {started && (
        <div
          className="textWindow"
          style={{
            height: '60px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DialogText data={data}></DialogText>
        </div>
      )}
      <div />
    </div>
  );
}

export default Main;
