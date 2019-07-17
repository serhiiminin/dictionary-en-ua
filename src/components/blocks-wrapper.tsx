import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../types';

const BlockWrapperContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${(props: ThemeProps): string => props.theme.main.space.lg};
  @media (min-width: 576px) {
    max-width: 54rem;
  }
  @media (min-width: 768px) {
    max-width: 72rem;
  }
  @media (min-width: 992px) {
    max-width: 96rem;
  }
  @media (min-width: 1200px) {
    max-width: 114rem;
  }
`;

interface Props {
  children: JSX.Element[];
}

const BlocksWrapper = ({ children }: Props): JSX.Element => <BlockWrapperContainer>{children}</BlockWrapperContainer>;

export default BlocksWrapper;
