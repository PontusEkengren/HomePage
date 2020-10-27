import React, { useEffect, useState, useCallback } from 'react';
import './index.css';
import './app.css';
import * as api from './api';
import * as storage from './storage';
import StartScreen from './StartScreen';
import DialogText from './DialogText';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
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
  // const { signIn, loaded } = useGoogleLogin({
  //   onSuccess,
  //   onAutoLoadFinished,
  //   clientId,
  //   cookiePolicy,
  //   loginHint,
  //   hostedDomain,
  //   autoLoad,
  //   isSignedIn,
  //   fetchBasicProfile,
  //   redirectUri,
  //   discoveryDocs,
  //   onFailure,
  //   uxMode,
  //   scope,
  //   accessType,
  //   responseType,
  //   jsSrc,
  //   onRequest,
  //   prompt
  // });

  // const mapArea = useCallback((data, direction) => {
  //   console.log('data', data)
  //   console.log('playerPos', getPlayerRelativePosition(map))

  //   console.log('direction', direction)
  // }, [map]);

  const setLocation = useCallback((data, direction) => {
    // mapArea(data, direction)
    setData(data);
    setSaveFile(data);
    // }, [setData, setSaveFile, mapArea]);
  }, [setData, setSaveFile]);

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
          .catch(err => console.log('You cant go that way'));
      };

      handleMove(key);
    }
  };


  const login = (response) => {
    if (response.accessToken) {
      setIsLogined(true);
      setAccessToken(response.accessToken);
      setName(response.profileObj.name);
      setImageUrl(response.profileObj.imageUrl);
    }
  }

  const logout = (response) => {
    setIsLogined(false);
    setAccessToken('');
    console.log('logout', response)
    setName('');
    setImageUrl('');
  }

  const handleLoginFailure = (response) => {
    // alert('Failed to log in')
    console.log('handleLoginFailure', response)

  }

  const handleLogoutFailure = (response) => {
    alert('Failed to log out')
  }


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
          .catch(err => console.log('You cant go that way'));
      };

      handleMove(choice);
    }
  };

  // console.log('data', data);
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
          <DialogText
            data={data}
            move={key}
            onHandleClick={handleClick}
          ></DialogText>
        </div>
      )}
      <div />

      {imageUrl &&
        // eslint-disable-next-line jsx-a11y/alt-text
        <img src={imageUrl} style={{ width: '42px', height: '42px' }} />
      }
      {isLogined ?
        <GoogleLogout
          clientId={REACT_APP_CLIENT_ID}
          buttonText='Logout'
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        >
        </GoogleLogout> : <GoogleLogin
          clientId={REACT_APP_CLIENT_ID}
          buttonText='Login'
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
        />
      }
      {/* <div>
        <div >
          <div>Header</div>
          <div>1</div>
          <div>Main</div>
          <div>Right</div>
          <div>Footer</div>
        </div>
      </div> */}
    </div>
  );
}

export default Main;
