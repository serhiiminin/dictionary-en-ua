import styled from 'styled-components';
import TitleBlock from '../title-block';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.main.colors.background};
`;

const Inner = styled.div`
  text-align: center;
`;

const Title = styled(TitleBlock)`
  color: ${props => props.theme.main.colors.background};
`;

const Description = styled.p`
  line-height: ${props => props.theme.main.lineHeight.lg};
  letter-spacing: ${props => props.theme.main.letterSpacing.sm};
  text-align: center;
  margin: 0;
`;

const Control = styled.div`
  margin-top: 45px;
`;

export default { Wrapper, Inner, Title, Description, Control };
