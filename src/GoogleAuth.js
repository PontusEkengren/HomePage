import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './app.css';

export default function GoogleAuth({ imageUrl, isLogined, clientId, handleSuccess, onLogoutSuccess, onLogOutFailure, onLogInFailure }) {

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', width: "160px" }}>

      {imageUrl &&
        //TODO: Change to styled component
        // eslint-disable-next-line jsx-a11y/alt-text
        <img style={{ marginRight: '12px', width: '42px', height: '42px' }} src={imageUrl} />
      }
      {isLogined ?
        <GoogleLogout
          clientId={clientId}
          buttonText='Logout'
          onLogoutSuccess={onLogoutSuccess}
          onFailure={onLogOutFailure}
        /> : <GoogleLogin
          clientId={clientId}
          buttonText='Login'
          onSuccess={handleSuccess}
          onFailure={onLogInFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
        />}
    </div>
  );
}
