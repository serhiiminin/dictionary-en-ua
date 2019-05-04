import styled from 'styled-components';
import TitleLg from '../title-lg';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const Inner = styled.div`
  text-align: center;
`;

const Title = styled(TitleLg)`
  color: ${props => props.theme.main.colors.background};
`;

const Description = styled.p`
  line-height: 26px;
  text-align: center;
  letter-spacing: 2px;
  margin: 0;
`;

const Control = styled.div``;

export default { Wrapper, Inner, Title, Description, Control };
