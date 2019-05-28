import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { PrivateRoute } from '../../components';
import LogOutContainer from './log-out';
import SignUpFormsRoute from './sign-up-forms';
import routes from '../../routes';

const AuthPage = () => (
  <Switch>
    <PrivateRoute path={routes.auth.logOut} component={LogOutContainer} />
    <SignUpFormsRoute path={routes.auth.root} />
  </Switch>
);

export default withRouter(AuthPage);
