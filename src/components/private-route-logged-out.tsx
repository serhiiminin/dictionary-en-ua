import React from 'react';
import { compose } from 'recompose';
import PrivateRoute from './private-route';
import routes from '../routes';
import { withAuth, AI } from '../context/auth';

interface OwnProps {
  path: string;
  component: React.ComponentType;
}

type Props = AI & OwnProps;

export default compose<Props, OwnProps>(withAuth)(
  ({ isLoggedIn, path, component }: Props): JSX.Element => (
    <PrivateRoute path={path} component={component} pathname={routes.auth.logIn} condition={isLoggedIn} />
  )
);
