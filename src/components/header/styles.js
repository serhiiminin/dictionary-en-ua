import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../images/logo.svg';

const Header = styled.div`
  padding: ${props => props.theme.main.padding.large} 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLink = styled(Link)`
  color: ${props => props.theme.palette.text.primary};
  text-decoration: none;
`;
const LogoSvg = styled(Logo)`
  width: 190px;
  height: 40px;
`;
const MenuDivider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${props => props.theme.main.padding.small};
`;

export default { Header, HeaderLink, LogoSvg, MenuDivider };
