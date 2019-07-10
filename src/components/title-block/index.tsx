import styled from 'styled-components';
import { ThemeProps } from '../../types';

const TitleBlock = styled.h2`
  font-style: normal;
  font-family: ${(props: ThemeProps): string => props.theme.main.fontFamily.cairoBold};
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.xl};
  letter-spacing: ${(props: ThemeProps): string => props.theme.main.letterSpacing.xs};
  color: ${(props: ThemeProps): string => props.theme.main.color.text};
  text-transform: uppercase;
  margin: 0;
`;

export default TitleBlock;
