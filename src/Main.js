import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import * as api from './api';
import * as storage from './storage';
import StartScreen from './StartScreen';
import DialogText from './DialogText';
import LeaderBoard from './LeaderBoard';
import GoogleAuth from './GoogleAuth';
import { ContainerCenterColumn, ContainerDialog } from './Styled/default';
const { REACT_APP_CLIENT_ID } = process.env;

function Main() {
  const [data, setData] = useState([]);
  const [key, setKey] = useState('UNDEFINED');
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(false);
  const [saveFile, setSaveFile] = storage.useLocalStorage('save', undefined);
  const [isLogined, setIsLogined] = storage.useLocalStorage('isLogined', false);
  const [accessToken, setAccessToken] = useState('');
  const [name, setName] = storage.useLocalStorage('name', '');
  const [imageUrl, setImageUrl] = storage.useLocalStorage('imageUrl', undefined);

  // const [map, setMap] = useState([["", "", "", ""], ["", "", "", "A"]])

  // const mapArea = useCallback((data, direction) => {
  //   console.log('data', data)
  //   console.log('playerPos', getPlayerRelativePosition(map))

  //   console.log('direction', direction)
  // }, [map]);

  const setLocation = useCallback(
    (data, direction) => {
      // mapArea(data, direction)
      setData(data);
      setSaveFile(data);
      // }, [setData, setSaveFile, mapArea]);
    },
    [setData, setSaveFile],
  );

  // useEffect(() => {
  //   console.log('asdadadasd');

  // }, []);

  useEffect(() => {
    const loadGame = () => {
      if (saveFile) {
        setData(saveFile);
      } else {
        api.loadGame().then(response => {
          setLocation(response.data);
        });
      }
    };

    setTimeout(() => {
      setTimer(true);
    }, 1850);

    loadGame();
  }, [saveFile, setLocation]);

  const handleClick = key => {
    console.log('key', key);
    setKey(key);

    if (key && key !== 'UNDEFINED') {
      const handleMove = direction => {
        api
          .move(data, direction)
          .then(response => setLocation(response.data))
          .catch(err => console.log(`You can't go that way`));
      };

      handleMove(key);
    }
  };

  const login = response => {
    if (response.accessToken) {
      setIsLogined(true);
      setAccessToken(response.accessToken);
      setName(response.profileObj.name);
      setImageUrl(response.profileObj.imageUrl);
    }
  };

  const logout = response => {
    setIsLogined(false);
    setAccessToken('');
    setName('');
    setImageUrl('');
  };

  const handleLoginFailure = response => {
    console.log('handleLoginFailure', response);
  };

  const handleLogoutFailure = response => {
    alert('Failed to log out');
  };

  // const getPlayerRelativePosition = (map) => {
  //   for (let i = 0; i < map.length; i++) {
  //     const row = map[i];
  //     for (let j = 0; j < row.length; j++) {
  //       if (row[j] === 'A') return { x: i, y: j };
  //     }
  //   }
  // };

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
          .then(response => setLocation(response.data, direction))
          .catch(err => console.log(`You can't go that way`));
      };

      handleMove(choice);
    }
  };

  if (!data) return <div className="center">Loading..</div>;
  return (
    <ContainerCenterColumn height={800} onKeyDown={handleKeyDown} tabIndex="0">
      <StartScreen started={started} data={data} timer={timer} onStarted={setStarted}></StartScreen>
      {started && (
        <ContainerDialog>
          <DialogText data={data} move={key} onHandleClick={handleClick}></DialogText>
        </ContainerDialog>
      )}

      <ContainerCenterColumn>test</ContainerCenterColumn>

      <ContainerCenterColumn>
        <GoogleAuth
          imageUrl={imageUrl}
          isLogined={isLogined}
          clientId={REACT_APP_CLIENT_ID}
          handleSuccess={login}
          onLogoutSuccess={logout}
          onLogOutFailure={handleLogoutFailure}
          onLogInFailure={handleLoginFailure}
        />
        <LeaderBoard />
      </ContainerCenterColumn>
    </ContainerCenterColumn>
  );
}

export default Main;
