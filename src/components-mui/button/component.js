import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const ButtonCustomized = ({ classes, isActive, ...restProps }) => (
  <Button
    className={isActive ? classes.active : ''}
    classes={{
      root: classes.root,
      disabled: classes.disabled,
    }}
    {...restProps}
  />
);

ButtonCustomized.propTypes = {
  isActive: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string),
};

ButtonCustomized.defaultProps = {
  isActive: false,
  classes: {},
};

export default ButtonCustomized;
