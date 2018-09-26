import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

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
  classes: PropTypes.objectOf(PropTypes.string),
  control: PropTypes.node,
};

TextFieldCustomized.defaultProps = {
  control: null,
  classes: {},
};

export default TextFieldCustomized;
