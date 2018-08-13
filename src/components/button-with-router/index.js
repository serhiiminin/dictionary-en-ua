import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Button } from '../../mui-components';

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

const enhance = compose(
  withRouter,
);

export default enhance(ButtonWithRouter);
