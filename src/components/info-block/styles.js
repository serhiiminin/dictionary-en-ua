import styled from 'styled-components';

const Outer = styled.div`
  margin-top: 10rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.main.fontSize.xl};
`;

const Description = styled.p`
  font-size: ${props => props.theme.main.fontSize.md};
`;

const Info = styled.div`
  margin-top: ${props => props.theme.main.space.md};
`;

export default { Outer, Title, Description, Info };
