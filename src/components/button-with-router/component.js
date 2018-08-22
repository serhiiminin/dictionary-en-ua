import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Button } from '../../components-mui';

const ButtonWithRouter = ({ to, staticContext, history, ...restProps }) => (
  <Button
    onClick={() => history.push(to)}
    {...restProps}
  />
);

ButtonWithRouter.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  staticContext: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  to: PropTypes.string.isRequired,
};

ButtonWithRouter.defaultProps = {
  staticContext: undefined,
};

export default ButtonWithRouter;
