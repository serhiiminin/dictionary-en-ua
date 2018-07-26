import React from 'react';
import GoogleLogin from 'react-google-login';
import { credentials } from '../api';

const Root = () => {
  const { CLIENT_ID } = credentials;

  return (
    <div className="root">
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={res => console.log(res)}
        onFailure={e => console.log(e)}
      />
    </div>
  );
};

export default Root;
