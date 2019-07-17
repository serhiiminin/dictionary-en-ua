import React, { useState } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { VisibilityOff, Visibility } from '@material-ui/icons';
import ButtonVisibility from './button-visibility';

const InputPassword = (props: object): JSX.Element => {
  const [isVisible, setVisibility] = useState<boolean>(false);
  const toggleVisibility = (): void => setVisibility(!isVisible);

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
