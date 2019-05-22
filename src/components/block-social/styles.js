import styled from 'styled-components';

const BlockSocial = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  margin-top: 3rem;
`;

const Label = styled.span`
  font-size: ${props => props.theme.main.fontSize.xs};
  font-family: ${props => props.theme.main.fontFamily.cairoRegular};
  letter-spacing: ${props => props.theme.main.letterSpacing.xs};
  color: ${props => props.theme.main.color.main};
  font-style: normal;
  font-weight: 300;
  margin: 0;
`;

export default { BlockSocial, Label };
