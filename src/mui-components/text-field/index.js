import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import { compose } from 'recompose';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const TextFieldCustomized = ({ classes, control, ...restProps }) => (
  <div className={control ? classes.textFieldControl : classes.textField}>
    <TextField
      {...restProps}
      classes={{
        root: classes.root,
      }}
      InputProps={{
        classes: {
          underline: classes.underline,
        },
      }}
      InputLabelProps={{
        className: classes.label,
      }}
    />
    {control}
  </div>

);

TextFieldCustomized.propTypes = {
  classes: classesShape.isRequired,
  control: PropTypes.node,
};

TextFieldCustomized.defaultProps = {
  control: null,
};

const enhance = compose(
  withStyles(styles),
);

export default enhance(TextFieldCustomized);
