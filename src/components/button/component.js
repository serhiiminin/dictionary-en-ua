import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

const ButtonWithRouter = ({ location, to, staticContext, ...restProps }) =>
  to ? (
    <Button to={to} color="primary" component={Link} disabled={location.pathname === to} {...restProps} />
  ) : (
    <Button {...restProps} />
  );

ButtonWithRouter.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  staticContext: PropTypes.shape({}),
  to: PropTypes.string,
};

ButtonWithRouter.defaultProps = {
  staticContext: undefined,
  to: null,
};

export default ButtonWithRouter;
