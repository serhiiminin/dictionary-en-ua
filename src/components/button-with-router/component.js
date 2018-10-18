import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { ButtonControl } from '..';

const ButtonWithRouter = ({ to, staticContext, history, location, ...restProps }) => (
  <ButtonControl
    color='primary'
    onClick={() => history.push(to)}
    isActive={location.pathname === to}
    {...restProps}
  />
);

ButtonWithRouter.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  staticContext: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  to: PropTypes.string.isRequired,
};

ButtonWithRouter.defaultProps = {
  staticContext: undefined,
};

export default ButtonWithRouter;
