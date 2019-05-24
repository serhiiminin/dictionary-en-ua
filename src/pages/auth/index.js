import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LogOutContainer from './log-out';
import SignUpForms from './sign-up-forms';
import routes from '../../routes';

const AuthPage = () => (
  <Switch>
    <Route path={routes.auth.logOut} component={LogOutContainer} />
    <Route path={routes.auth.root} component={SignUpForms} />
  </Switch>
);

export default withRouter(AuthPage);
