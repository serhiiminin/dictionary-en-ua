import React from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';

const InputPassword = ({ isVisible, toggleVisibility, value, label, onChange, ...props }) => (
  <TextField
    variant="outlined"
    type={isVisible ? 'text' : 'password'}
    label={label}
    value={value}
    onChange={onChange}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton aria-label="Toggle password visibility" onClick={toggleVisibility}>
            {isVisible ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      ),
    }}
    {...props}
  />
);

InputPassword.propTypes = {
  isVisible: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
};

InputPassword.defaultProps = {
  isVisible: false,
  value: '',
  label: '',
};

export default InputPassword;
