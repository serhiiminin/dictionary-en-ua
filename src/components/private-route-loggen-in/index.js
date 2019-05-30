import React from 'react';
import { withAuth } from '../../context/auth';
import PrivateRoute from '../private-route';
import routes from '../../routes';

export default withAuth(({ isLoggedIn, ...rest }) => (
  <PrivateRoute pathname={routes.auth.logIn} condition={!isLoggedIn} {...rest} />
));
