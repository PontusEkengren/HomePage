import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Image, ContainerCenter } from './Styled/default';

export default function GoogleAuth({
  imageUrl,
  isLogined,
  clientId,
  handleSuccess,
  onLogoutSuccess,
  onLogOutFailure,
  onLogInFailure,
}) {
  return (
    <ContainerCenter>
      {imageUrl && <Image src={imageUrl} />}
      {isLogined ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
          onFailure={onLogOutFailure}
        />
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={handleSuccess}
          onFailure={onLogInFailure}
          cookiePolicy={'single_host_origin'}
          responseType="code,token"
        />
      )}
    </ContainerCenter>
  );
}
