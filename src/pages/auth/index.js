import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LogOutContainer from './log-out';
import SignUpFormsRoute from './sign-up-forms';
import routes from '../../routes';

const AuthPage = () => (
  <Switch>
    <Route path={routes.auth.logOut} component={LogOutContainer} />
    <SignUpFormsRoute path={routes.auth.root} />
  </Switch>
);

export default withRouter(AuthPage);
