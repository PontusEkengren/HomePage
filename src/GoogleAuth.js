import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './app.css';

export default function GoogleAuth({ isLogined, clientId, handleSuccess, onLogoutSuccess, onLogOutFailure, onLogInFailure }) {

  return (
    <div >
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
