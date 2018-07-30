import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import { compose } from 'recompose';
import { styles } from './styles';

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
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const ButtonMui = compose(
  withStyles(styles),
)(ButtonCustomized);

export { ButtonMui };
