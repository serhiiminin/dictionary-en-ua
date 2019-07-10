import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../images/logo.svg';
import { ThemeProps } from '../../types';

const Header = styled.div`
  margin-top: ${(props: ThemeProps): string => props.theme.main.space.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const HeaderLink = styled(Link)`
  color: ${(props: ThemeProps): string => props.theme.palette.text.primary};
  text-decoration: none;
`;
const LogoSvg = styled(Logo)`
  width: 19rem;
  height: 4rem;
`;
const MenuDivider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${(props: ThemeProps): string => props.theme.main.space.sm};
`;

export default { Header, HeaderLink, LogoSvg, MenuDivider };
