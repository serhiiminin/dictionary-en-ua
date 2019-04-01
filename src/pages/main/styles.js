import { TextField as MuiTextField } from '@material-ui/core';
import styled from 'styled-components';
import { ReactComponent as MainDecor } from '../../images/main-decor.svg';

const MainPage = styled.div`
  display: grid;
  justify-content: center;
  padding-top: 230px;
`;
const PageTitle = styled.h1`
  font-size: 30px;
  letter-spacing: 2px;
`;
const SearchBlock = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 30px;
  align-items: center;
`;
const TextField = styled(MuiTextField)`
  width: 350px;
`;

const MainDecorSvg = styled(MainDecor)`
  max-width: 100%;
`;

export default { MainPage, PageTitle, SearchBlock, TextField, MainDecorSvg };
