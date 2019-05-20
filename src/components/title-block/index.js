import styled from 'styled-components';

const TitleBlock = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: ${props => props.theme.main.fontSizes.xl};
  line-height: ${props => props.theme.main.lineHeight.sm};
  letter-spacing: ${props => props.theme.main.letterSpacing.sm};
  color: ${props => props.theme.main.colors.text};
  text-transform: uppercase;
`;

export default TitleBlock;
