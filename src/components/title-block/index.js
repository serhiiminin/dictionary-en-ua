import styled from 'styled-components';

const TitleBlock = styled.h2`
  font-style: normal;
  font-family: ${props => props.theme.main.fontFamily.cairoBold};
  font-size: ${props => props.theme.main.fontSize.xl};
  letter-spacing: ${props => props.theme.main.letterSpacing.xs};
  color: ${props => props.theme.main.color.text};
  text-transform: uppercase;
  margin: 0;
`;

export default TitleBlock;
