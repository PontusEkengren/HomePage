import React, { useEffect, useState } from 'react';
import './index.css';
import './app.css';
import * as api from './api';
import * as storage from './storage';

function Main() {
  const [data, setData] = useState([]);
  const [saveFile, setSaveFile] = storage.useLocalStorage('save', undefined);

  useEffect(() => startGame(), []);

  const startGame = () => {
    if (saveFile) {
      console.log('local');
      setData(saveFile);
    } else {
      console.log('api');
      api.postStartGameCall().then(response => {
        setData(response.data);
        setSaveFile(response.data);
      });
    }
  };

  console.log('data', data);
  return (
    <div className="center" style={{ height: '250px' }}>
      <div>Under construction.. =) </div>

      <div>
        You find yourself in a strange room. You're not sure how you got here
        but you know you need to escape, somehow.
      </div>
    </div>
  );
}

export default Main;
