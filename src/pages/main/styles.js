import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';
import styled from 'styled-components';

const MainPage = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 24rem;
`;

const SearchBlockWrapper = styled.div`
  width: 54rem;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.main.fontSize.lg};
  letter-spacing: ${props => props.theme.main.letterSpacing.xs};
  font-weight: normal;
  margin: 0;
`;
const BoldText = styled.span`
  font-size: ${props => props.theme.main.fontSize.xl};
  font-family: ${props => props.theme.main.fontFamily.cairoBold};
  letter-spacing: ${props => props.theme.main.letterSpacing.xs};
`;

const SearchBlock = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${props => props.theme.main.space.xl};
  align-items: center;
  margin-top: ${props => props.theme.main.space.md};
`;
const TextField = styled(props => <MuiTextField {...props} />)`
  && {
    width: 35rem;
  }
`;

export default { MainPage, SearchBlockWrapper, PageTitle, BoldText, SearchBlock, TextField };
