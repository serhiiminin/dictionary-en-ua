import React, { useContext } from 'react';
import { RouteProps } from 'react-router-dom';
import PrivateRoute from './private-route';
import routes from '../routes';
import { AuthContext } from '../context/auth';

export default ({ path, component }: RouteProps): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext);

  return <PrivateRoute path={path} component={component} pathname={routes.auth.logIn} condition={!isLoggedIn} />;
};
