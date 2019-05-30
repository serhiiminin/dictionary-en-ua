import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CheckSignUp, ConfirmRegistration } from '../../chunks';
import { PrivateRoute } from '../../components';
import LogOutContainer from './log-out';
import SignUpFormsRoute from './sign-up-forms';
import routes from '../../routes';

const AuthPage = () => (
  <Switch>
    <PrivateRoute path={routes.auth.logOut} component={LogOutContainer} />
    <Route path={routes.auth.checkSignUp} component={CheckSignUp} />
    <Route path={routes.auth.confirm} component={ConfirmRegistration} />
    <SignUpFormsRoute path={routes.auth.root} />
  </Switch>
);

export default withRouter(AuthPage);
