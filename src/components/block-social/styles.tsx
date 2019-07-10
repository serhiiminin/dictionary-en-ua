import styled from 'styled-components';
import { ThemeProps } from '../../types';

const BlockSocial = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  margin-top: 3rem;
`;

const Label = styled.span`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.xs};
  font-family: ${(props: ThemeProps): string => props.theme.main.fontFamily.cairoRegular};
  letter-spacing: ${(props: ThemeProps): string => props.theme.main.letterSpacing.xs};
  color: ${(props: ThemeProps): string => props.theme.main.color.main};
  font-style: normal;
  font-weight: 300;
  margin: 0;
`;

export default { BlockSocial, Label };
