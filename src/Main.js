import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import * as api from './api';
import * as storage from './storage';
import StartScreen from './StartScreen';
import DialogText from './DialogText';
import LeaderBoard from './LeaderBoard';
import GoogleAuth from './GoogleAuth';
import Maze from './Maze';
import { getPlayerRelativePosition } from './Game/player';
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
  const mapSize = 100;

  const [mazeMap, setMazeMap] = useState([]);
  const translateMovementToPosition = (position, movement) => {
    switch (movement) {
      case 'N':
        return { ...position, y: position.y - 1 };
      case 'E':
        return { ...position, x: position.x + 1 };
      case 'S':
        return { ...position, y: position.y + 1 };
      case 'W':
        return { ...position, x: position.x - 1 };
      default:
        throw new Error('Unexpected movement');
    }
  };

  const translateDirectionToBlock = direction => {
    switch (direction) {
      case 'N':
        return '---';
      case 'E':
        return '|';
      case 'S':
        return '---';
      case 'W':
        return '|';
      default:
        throw new Error('Unexpected direction');
    }
  };

  const renderMapWith = useCallback(
    (position, graphic) => {
      console.log('wat');
      const newMap = [...mazeMap];
      newMap[position.y][position.x] = graphic;
      setMazeMap(newMap);
    },
    [mazeMap],
  );

  const renderSurrounding = (centerPosition, exits) => {
    console.log('centerPosition', centerPosition, exits);

    const blockedExits = ['N', 'E', 'S', 'W'].filter(exit => !exits.some(e => e === exit));
    console.log('blockedExits', blockedExits);

    const newMap = [...mazeMap];
    blockedExits.forEach(exitDirection => {
      const surroundingPosition = translateMovementToPosition(centerPosition, exitDirection);
      newMap[surroundingPosition.y][surroundingPosition.x] = translateDirectionToBlock(
        exitDirection,
      );
    });

    setMazeMap(newMap);
  };

  const createNewMap = (data, movement) => {
    console.log('data', data, movement);
    const currentPosition = getPlayerRelativePosition(mazeMap);
    renderMapWith(currentPosition, ' ');
    const newPosition = translateMovementToPosition(currentPosition, movement);
    renderMapWith(newPosition, 'A');
    renderSurrounding(newPosition, data.exits);
  };

  const setLocation = useCallback(
    (data, direction) => {
      console.log('setLocation');

      createNewMap(data, direction);
      setData(data);
      setSaveFile(data);
    },
    [setData, createNewMap, setSaveFile],
  );

  //Populate map
  useEffect(() => {
    for (let i = 0; i < mapSize; i++) {
      mazeMap.push([]);
    }

    for (let i = 0; i < mazeMap.length; i++) {
      const row = mazeMap[i];
      for (let j = 0; j < mapSize; j++) {
        row[j] = i == mapSize / 2 && j == mapSize / 2 ? 'A' : undefined;
      }
    }
  }, []);

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
      <StartScreen
        started={started}
        data={data}
        timer={timer}
        onStarted={started => {
          setStarted(started);
          renderMapWith({ x: mapSize / 2, y: mapSize / 2 }, 'A');
        }}
      ></StartScreen>
      {started && (
        <ContainerDialog>
          <DialogText data={data} move={key} onHandleClick={handleClick}></DialogText>
        </ContainerDialog>
      )}

      <Maze style={{ width: '800px', height: '800px' }} data={mazeMap}></Maze>

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
