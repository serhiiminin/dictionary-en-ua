import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

const ButtonCustomized = ({ location, to, staticContext, ...restProps }) =>
  to ? (
    <Button to={to} color="primary" component={Link} disabled={location.pathname === to} {...restProps} />
  ) : (
    <Button {...restProps} />
  );

ButtonCustomized.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  staticContext: PropTypes.shape({}),
  to: PropTypes.string,
};

ButtonCustomized.defaultProps = {
  staticContext: undefined,
  to: null,
};

export default ButtonCustomized;
