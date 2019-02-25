import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import routes from '../../routes';

const PrivateRoute = ({ isLoggedIn, component: Cmp, render, ...rest }) => (
  <Route
    {...rest}
    render={params => {
      if (!isLoggedIn) {
        return (
          <Redirect
            to={{
              pathname: routes.auth.login,
              redirectedFrom: params.location,
            }}
          />
        );
      }

      return render ? render(params) : Cmp && <Cmp {...params} />;
    }}
  />
);

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.instanceOf(Component),
    PropTypes.instanceOf(PureComponent),
    PropTypes.func,
  ]),
  render: PropTypes.func,
};

PrivateRoute.defaultProps = {
  component: null,
  render: null,
};

export default PrivateRoute;
