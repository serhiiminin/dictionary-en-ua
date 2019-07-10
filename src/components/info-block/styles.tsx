import styled from 'styled-components';
import { ThemeProps } from '../../types';

const Outer = styled.div`
  margin-top: 10rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.xl};
`;

const Description = styled.p`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.md};
`;

const Info = styled.div`
  margin-top: ${(props: ThemeProps): string => props.theme.main.space.md};
`;

export default { Outer, Title, Description, Info };
