import React from 'react';
import { withAuth } from '../../context/auth';
import PrivateRoute from '../private-route';
import routes from '../../routes';

interface Props {
  isLoggedIn: boolean;
}

export default withAuth(
  ({ isLoggedIn, ...rest }: Props): JSX.Element => (
    <PrivateRoute pathname={routes.root} condition={isLoggedIn} {...rest} />
  )
);
