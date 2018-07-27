import React from 'react';
import GoogleLogin from 'react-google-login';
import { credentials } from '../api';
import api from './../api/fetcher';

const Root = () => {
  const { CLIENT_ID } = credentials;

  return (
    <div className="root">
      <button onClick={() => api().then(res => console.log(res))}>Hello</button>
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
