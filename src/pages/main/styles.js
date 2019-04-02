import React from 'react';
import { TextField as MuiTextField } from '@material-ui/core';
import styled from 'styled-components';
import { ReactComponent as MainDecor } from '../../images/main-decor.svg';

const MainPage = styled.div`
  display: grid;
  justify-content: center;
  padding-top: 210px;
`;

const SearchBlockWrapper = styled.div`
  width: 540px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: normal;
  margin: ${props => props.theme.main.margin.small} 0;
`;
const BoldText = styled.span`
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
`;

const SearchBlock = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 30px;
  align-items: center;
  margin-top: ${props => props.theme.main.margin.extraLarge};
`;
const TextField = styled(props => <MuiTextField {...props} />)`
  && {
    width: 350px;
  }
`;
const MainDecorSvg = styled(MainDecor)`
  max-width: 100%;
  margin-top: 150px;
`;

export default { MainPage, SearchBlockWrapper, PageTitle, BoldText, SearchBlock, TextField, MainDecorSvg };
