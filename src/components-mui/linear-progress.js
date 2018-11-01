import React from 'react';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';

const LinearProgressCustomized = styled(props => <LinearProgress {...props} />)`
  && {
    background: ${props => props.theme.main.colors.background};
  }
`;

export default LinearProgressCustomized;
