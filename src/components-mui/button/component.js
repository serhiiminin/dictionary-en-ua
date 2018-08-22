import { Button } from '@material-ui/core';
import React from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';

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
  classes: classesShape,
};

ButtonCustomized.defaultProps = {
  classes: classesDefaultProps
};

export default ButtonCustomized;
