import styled from 'styled-components';

const SearchBlock = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  gap: ${props => props.theme.main.space.sm};
`;

export default { SearchBlock };
