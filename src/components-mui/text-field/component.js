import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';

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
  classes: classesShape,
  control: PropTypes.node,
};

TextFieldCustomized.defaultProps = {
  control: null,
  classes: classesDefaultProps,
};

export default TextFieldCustomized;
