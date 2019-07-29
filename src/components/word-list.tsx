import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from '../types';
import Container from './container';

const WordsListWrapper = styled.div``;

const NoResult = styled.span`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.md};
`;

interface Props {
  children: JSX.Element[];
}

const WordList = ({ children }: Props): JSX.Element => {
  const Words =
    children.length === 0 ? (
      <Container>
        <NoResult>There is no result</NoResult>
      </Container>
    ) : (
      children
    );

  return <WordsListWrapper>{Words}</WordsListWrapper>;
};

export default WordList;
