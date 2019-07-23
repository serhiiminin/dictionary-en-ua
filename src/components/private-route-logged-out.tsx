import React from 'react';
import { compose } from 'recompose';
import { RouteProps } from 'react-router-dom';
import PrivateRoute from './private-route';
import routes from '../routes';
import { withAuth, AI } from '../context/auth';

type Props = AI & RouteProps;

export default compose<Props, RouteProps>(withAuth)(
  ({ isLoggedIn, path, component }: Props): JSX.Element => (
    <PrivateRoute path={path} component={component} pathname={routes.auth.logOut} condition={isLoggedIn} />
  )
);
