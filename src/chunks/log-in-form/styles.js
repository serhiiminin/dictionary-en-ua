import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 1em;
`;

const Title = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 45px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #161617;
`;

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
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 2px;
  color: ${props => props.theme.main.colors.dark};
  text-decoration: none;
`;

export default { Form, Title, SubmitBlock, LinkForgotPassword };
