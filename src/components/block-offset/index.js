import styled from 'styled-components';

const BlockOffset = styled.div`
  padding: ${props => props.y || 0}px ${props => props.x || 0}px;
`;

export default BlockOffset;
