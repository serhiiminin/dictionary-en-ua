import styled from 'styled-components';

const SMALL_WIDTH = '40%';
const BIG_WIDTH = '60%';

const Outer = styled.div`
  display: flex;
  flex-flow: row wrap;
  position: relative;
  width: 100%;
  height: 560px;
  box-shadow: 4px 8px 40px rgba(123, 123, 123, 0.4);
  border-radius: 8px;
`;

const Background = styled.div`
  position: absolute;
  width: ${SMALL_WIDTH};  
  height: 100%;  
  background: linear-gradient(149.02deg,#86d1ff -11.95%,#bbd6fd 89.7%,#c5d7fd 89.71%,#c5d7fd 89.73%);
  transition: all ${props => props.transitionDelay}ms ease-in-out;
  left: ${props => (props.isLeft ? BIG_WIDTH : 0)}
  top: 0;
  border-radius: 8px;
  z-index: 0;
`;

const Left = styled.div`
  width: ${props => (props.isActive ? BIG_WIDTH : SMALL_WIDTH)}
  position: relative;
  min-height: 100%;
`;

const Right = styled.div`
  width: ${props => (props.isActive ? BIG_WIDTH : SMALL_WIDTH)}
  position: relative;
  min-height: 100%;
`;

export default { Outer, Left, Right, Background };
