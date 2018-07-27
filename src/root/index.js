import React from 'react';
import GoogleLogin from 'react-google-login';
import { CLIENT_ID } from '../api/credentials';
import { api } from './../api/fetcher';

const Root = () => (
  <div className="root">
    <button onClick={() => api()
      .then(res => console.log(res))}>Hello
    </button>
    <GoogleLogin
      clientId={CLIENT_ID}
      buttonText="Login"
      onSuccess={res => console.log(res)}
      onFailure={e => console.log(e)}
    />
  </div>
);

export { Root };
