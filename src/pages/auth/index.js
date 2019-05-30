import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CheckSignUp, ConfirmRegistration } from '../../chunks';
import { PrivateRouteLoggedOut, PrivateRouteLoggedIn, PrivateRoute } from '../../components';
import LogOutContainer from './log-out';
import SignUpFormsRoute from './sign-up-forms';
import routes from '../../routes';
import { withAuth } from '../../context/auth';

const PrivateRouteSuccess = withAuth(({ isSignUpApplied, ...rest }) => (
  <PrivateRoute pathname={routes.root} condition={!isSignUpApplied} {...rest} />
));

const AuthPage = () => (
  <Switch>
    <PrivateRouteLoggedIn path={routes.auth.logOut} component={LogOutContainer} />
    <PrivateRouteSuccess path={routes.auth.checkSignUp} component={CheckSignUp} />
    <Route path={routes.auth.confirm} component={ConfirmRegistration} />
    <PrivateRouteLoggedOut path={routes.auth.root} component={SignUpFormsRoute} />
  </Switch>
);

export default withRouter(AuthPage);
