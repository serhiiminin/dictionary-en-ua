import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ButtonCustomized = ({ classes, ...restProps }) => (
  <Button
    classes={{
      root: classes.root,
      disabled: classes.disabled,
    }}
    {...restProps}
  />
);

ButtonCustomized.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

ButtonCustomized.defaultProps = {
  classes: {},
};

export default ButtonCustomized;
