import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SubmitBlock = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

const LinkForgotPassword = styled(Link)`
  font-style: normal;
  text-decoration: none;
  font-size: ${props => props.theme.main.fontSize.xs};
  font-family: ${props => props.theme.main.fontFamily.cairoRegular};
  letter-spacing: ${props => props.theme.main.letterSpacing.xs};
  color: ${props => props.theme.main.color.dark};
`;

export default { SubmitBlock, LinkForgotPassword };
