import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../types';
import TitleBlock from './title-block';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${(props: ThemeProps): string => props.theme.main.color.background};
`;

const Inner = styled.div`
  text-align: center;
`;

const Title = styled(TitleBlock)`
  color: ${(props: ThemeProps): string => props.theme.main.color.background};
`;

const Description = styled.p`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
  letter-spacing: ${(props: ThemeProps): string => props.theme.main.letterSpacing.xs};
  text-align: center;
  margin: 0;
`;

const Control = styled.div`
  margin-top: 4.5rem;
`;

interface Props {
  title: string;
  description: string;
  control?: JSX.Element;
}

const AuthSuggestion = ({ title, description, control }: Props): JSX.Element => (
  <Wrapper>
    <Inner>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Control>{control}</Control>
    </Inner>
  </Wrapper>
);

export default AuthSuggestion;
