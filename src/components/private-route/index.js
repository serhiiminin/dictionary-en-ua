import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ condition, pathname, component: Cmp, render, ...rest }) => (
  <Route
    {...rest}
    render={params => {
      if (condition) {
        return (
          <Redirect
            to={{
              pathname,
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
  condition: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
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
