import styled from 'styled-components';

const BlockSocial = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
`;

const Label = styled.span`
  margin: 0;
  font-family: Cairo;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 2px;
  color: #979797;
`;

export default { BlockSocial, Label };
