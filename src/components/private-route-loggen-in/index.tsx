import React from 'react';
import { withAuth } from '../../context/auth';
import PrivateRoute from '../private-route';
import routes from '../../routes';

interface Props {
  isLoggedIn: boolean;
  rest: object;
}

export default withAuth(
  ({ isLoggedIn, ...rest }: Props): JSX.Element => (
    <PrivateRoute pathname={routes.auth.logIn} condition={!isLoggedIn} {...rest} />
  )
);
