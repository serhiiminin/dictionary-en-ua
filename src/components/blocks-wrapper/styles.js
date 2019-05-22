import styled from 'styled-components';

const BlockWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${props => props.theme.main.space.lg};
  @media (min-width: 576px) {
    max-width: 54rem;
  }
  @media (min-width: 768px) {
    max-width: 72rem;
  }
  @media (min-width: 992px) {
    max-width: 96rem;
  }
  @media (min-width: 1200px) {
    max-width: 114rem;
  }
`;

export default { BlockWrapper };
