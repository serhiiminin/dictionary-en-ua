import styled from 'styled-components';
import { ReactComponent as CryingGirlSvg } from '../../../images/crying-girl.svg';

const Wrapper = styled.div`
  display: grid;
  margin-top: 10rem;
  grid-template-columns: 1fr 2fr;
  gap: ${props => props.theme.main.space.lg};
`;

const CryingGirl = styled(CryingGirlSvg)`
  max-width: 50rem;
  width: 100%;
  height: auto;
`;

const ActionsBlock = styled.div`
  padding: ${props => props.theme.main.space.md} 0;
`;

export default { CryingGirl, Wrapper, ActionsBlock };
