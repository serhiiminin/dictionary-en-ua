import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LogInContainer from './log-in';
import LogOutContainer from './log-out';
import SignUpContainer from './sign-up';
import routes from '../../routes';

const AuthPage = () => (
  <Switch>
    <Route exact path={routes.auth.logIn} component={LogInContainer} />
    <Route exact path={routes.auth.logOut} component={LogOutContainer} />
    <Route exact path={routes.auth.signUp} component={SignUpContainer} />
  </Switch>
);

export default AuthPage;
