import React from 'react';
import { IconButton } from '@material-ui/core';
import styled from 'styled-components';

const ButtonVisibility = styled(props => <IconButton disableRipple {...props} />)`
  && {
    background: transparent;
    margin: 0;
    padding: 0;
    &:hover {
      background: transparent;
    }
  }
`;

export default ButtonVisibility;
