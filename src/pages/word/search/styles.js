import styled from 'styled-components';

const SearchBlock = styled.div`
  display: grid;
  width: 50rem;
  grid-auto-flow: column;
  gap: ${props => props.theme.main.space.sm};
`;

export default { SearchBlock };
