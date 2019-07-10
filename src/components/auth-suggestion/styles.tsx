import styled from 'styled-components';
import TitleBlock from '../title-block';
import { ThemeProps } from '../../types';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${(props: ThemeProps): string => props.theme.main.color.background};
`;

const Inner = styled.div`
  text-align: center;
`;

const Title = styled(TitleBlock)`
  color: ${(props: ThemeProps): string => props.theme.main.color.background};
`;

const Description = styled.p`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
  letter-spacing: ${(props: ThemeProps): string => props.theme.main.letterSpacing.xs};
  text-align: center;
  margin: 0;
`;

const Control = styled.div`
  margin-top: 4.5rem;
`;

export default { Wrapper, Inner, Title, Description, Control };
