import React from 'react';
import { compose } from 'recompose';
import { Route, Switch, withRouter, RouteProps } from 'react-router-dom';
import { CheckSignUp, ConfirmRegistration } from '../../chunks';
import { PrivateRouteLoggedOut, PrivateRouteLoggedIn, PrivateRoute, Container } from '../../components';
import LogOutContainer from './log-out';
import SignUpFormsRoute from './sign-up-forms';
import { withAuth, AI } from '../../context/auth';
import routes from '../../routes';

type Props = AI & RouteProps;

const PrivateRouteSuccess = compose<Props, RouteProps>(withAuth)(
  ({ isSignUpApplied, path, component }): JSX.Element => (
    <PrivateRoute pathname={routes.root} condition={!isSignUpApplied} path={path} component={component} />
  )
);

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

export default withRouter(AuthPage);
