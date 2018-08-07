import React from 'react';
import PropTypes from 'prop-types';
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
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
