import styled from 'styled-components';
import { ThemeProps } from '../types';

interface OwnProps {
  textAlign?: 'left' | 'center' | 'right';
}

type Props = OwnProps & ThemeProps;

const TitleBlock = styled.h2`
  font-style: normal;
  font-family: ${(props: Props): string => props.theme.main.fontFamily.cairoBold};
  font-size: ${(props: Props): string => props.theme.main.fontSize.xl};
  letter-spacing: ${(props: Props): string => props.theme.main.letterSpacing.xs};
  color: ${(props: Props): string => props.theme.main.color.text};
  text-align: ${(props: Props): string => props.textAlign || 'left'};
  text-transform: uppercase;
  margin: 0;
`;

export default TitleBlock;
