import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { compose } from 'recompose';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

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
  classes: classesShape.isRequired,
};

const enhance = compose(
  withStyles(styles),
);

export default enhance(ButtonCustomized);
