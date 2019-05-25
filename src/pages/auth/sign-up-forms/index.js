import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import SignUpFormsCmp from './component';
import routes from '../../../routes';
import { withAuth } from '../../../context/auth';

const SignUpFormsRoute = ({ isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={params =>
      isLoggedIn ? (
        <Redirect
          to={{
            pathname: routes.words.list,
            redirectedFrom: params.location,
          }}
        />
      ) : (
        <SignUpFormsCmp {...params} />
      )
    }
  />
);

SignUpFormsRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  render: PropTypes.func,
};

SignUpFormsRoute.defaultProps = {
  render: null,
};

export default withAuth(SignUpFormsRoute);
