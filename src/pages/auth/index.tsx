import React from 'react';
import { compose } from 'recompose';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CheckSignUp, ConfirmRegistration } from '../../chunks';
import { PrivateRouteLoggedOut, PrivateRouteLoggedIn, PrivateRoute } from '../../components';
import LogOutContainer from './log-out';
import SignUpFormsRoute from './sign-up-forms';
import { withAuth, AI } from '../../context/auth';
import routes from '../../routes';

interface OwnProps {
  path: string;
  component: React.ComponentType;
}

type Props = AI & OwnProps;

const PrivateRouteSuccess = compose<Props, OwnProps>(withAuth)(({ isSignUpApplied, path, component }): JSX.Element => (
  <PrivateRoute pathname={routes.root} condition={!isSignUpApplied} path={path} component={component} />
));

const AuthPage = (): JSX.Element => (
  <Switch>
    <PrivateRouteLoggedIn path={routes.auth.logOut} component={LogOutContainer} />
    <PrivateRouteSuccess path={routes.auth.checkSignUp} component={CheckSignUp} />
    <Route path={routes.auth.confirm} component={ConfirmRegistration} />
    <PrivateRouteLoggedOut path={routes.auth.root} component={SignUpFormsRoute} />
  </Switch>
);

export default withRouter(AuthPage);
