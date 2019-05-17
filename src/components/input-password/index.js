import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import ButtonVisibility from '../button-visibility';

const InputPassword = props => {
  const [isVisible, setVisibility] = useState(false);
  const toggleVisibility = () => setVisibility(!isVisible);

  return (
    <TextField
      {...props}
      variant="outlined"
      type={isVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <ButtonVisibility aria-label="Toggle password visibility" onClick={toggleVisibility}>
              {isVisible ? <Visibility /> : <VisibilityOff />}
            </ButtonVisibility>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputPassword;
