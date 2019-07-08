import React from 'react';
import styled, { keyframes } from 'styled-components';
import { TextCircle } from '../../../components';

const SMALL_WIDTH = '40%';
const BIG_WIDTH = '60%';
const DEFAULT_SPEED = 12;

const Outer = styled.div`
  width: 100%;
  height: 56rem;
  display: flex;
  margin-top: 10rem;
  flex-flow: row wrap;
  box-shadow: ${props => props.theme.main.boxShadow.block};
  position: relative;
  border-radius: ${props => props.theme.main.borderRadius.md};
`;

const Background = styled.div`
  position: absolute;
  height: 100%;
  width: ${SMALL_WIDTH};
  background: ${props => props.theme.main.color.gradient.block};
  transition: all ${props => props.transitionDelay}ms ease-in-out;
  left: ${props => (props.isLeft ? BIG_WIDTH : 0)};
  border-radius: ${props => props.theme.main.borderRadius.md};
  border-width: 0;
  z-index: 0;
  top: 0;
`;

const HalfPart = styled.div`
  width: ${props => (props.isActive ? BIG_WIDTH : SMALL_WIDTH)};
  padding: 4rem 7rem;
  position: relative;
  height: 100%;
`;

const rotate = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Circle = styled(({ transitionDelay, isLeft, speed, ...props }) => <TextCircle {...props} />)`
  transition: all ${props => props.transitionDelay}ms ease-in-out;
  animation: ${rotate} ${props => props.speed || DEFAULT_SPEED}s linear infinite;
  transform: translate(-50%, -50%) rotate(0deg);
  position: absolute;
  z-index: 1;
  top: 0;
  left: ${props => (props.isLeft ? BIG_WIDTH : SMALL_WIDTH)};
`;

export default { Outer, HalfPart, Background, Circle };
