import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';
import { compose } from 'recompose';
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

const enhance = compose(
  withStyles(styles),
);

export default enhance(ButtonCustomized);
