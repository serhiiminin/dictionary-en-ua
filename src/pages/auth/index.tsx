import React, { useContext } from 'react';
import { Route, Switch, RouteProps } from 'react-router-dom';
import {
  CheckSignUp,
  ConfirmRegistration,
  PrivateRouteLoggedOut,
  PrivateRouteLoggedIn,
  PrivateRoute,
  Container,
} from '../../components';
import LogOutContainer from './log-out';
import SignUpFormsRoute from './sign-up-forms';
import { AuthContext } from '../../context/auth';
import routes from '../../routes';

const PrivateRouteSuccess = ({ path, component }: RouteProps): JSX.Element => {
  const { isSignUpApplied } = useContext(AuthContext);

  return <PrivateRoute pathname={routes.root} condition={!isSignUpApplied} path={path} component={component} />;
};

const AuthPage = (): JSX.Element => (
  <Container>
    <Switch>
      <PrivateRouteLoggedIn path={routes.auth.logOut} component={LogOutContainer} />
      <PrivateRouteSuccess path={routes.auth.checkSignUp} component={CheckSignUp} />
      <Route path={routes.auth.confirm} component={ConfirmRegistration} />
      <PrivateRouteLoggedOut path={routes.auth.root} component={SignUpFormsRoute} />
    </Switch>
  </Container>
);

export default AuthPage;
