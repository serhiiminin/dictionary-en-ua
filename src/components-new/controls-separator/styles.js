import styled from 'styled-components';

const ControlsSeparator = styled.div`
  display: grid;
  align-content: center;
  grid-auto-flow: column;
  padding: ${props => props.theme.main.padding.medium} 0;
  justify-content: ${props => props.align};
  column-gap: 0.5rem;
  row-gap: 0.5rem;
`;

export default {
  ControlsSeparator,
};
