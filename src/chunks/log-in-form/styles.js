import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SubmitBlock = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

const LinkForgotPassword = styled(Link)`
  font-family: Cairo;
  font-style: normal;
  font-weight: 600;
  font-size: ${props => props.theme.main.fontSizes.sm};
  line-height: ${props => props.theme.main.lineHeight.md};
  letter-spacing: ${props => props.theme.main.letterSpacing.xs};
  color: ${props => props.theme.main.colors.dark};
  text-decoration: none;
`;

export default { SubmitBlock, LinkForgotPassword };
