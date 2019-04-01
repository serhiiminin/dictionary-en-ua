import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../images/logo.svg';

const Header = styled.div` {
  padding: ${props => props.theme.main.padding.large} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLink = styled(Link)`
  color: theme.palette.text.primary;
  text-decoration: none;
  font-size: 1.6rem;
`;
const LogoSvg = styled(Logo)`
  width: 250px;
  height: 55px;
`;
const MenuDivider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 5px;
`;

export default { Header, HeaderLink, LogoSvg, MenuDivider };
