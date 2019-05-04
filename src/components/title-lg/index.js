import styled from 'styled-components';

const TitleLg = styled.h2`
  font-family: Cairo;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 45px;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${props => props.theme.main.colors.text};
`;

export default TitleLg;
