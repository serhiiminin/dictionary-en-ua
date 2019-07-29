import React from 'react';
import styled from 'styled-components';

const WordsListWrapper = styled.div``;

interface Props {
  children: JSX.Element[];
}

const WordList = ({ children }: Props): JSX.Element => {
  const Words = children.length === 0 ? <span>There is no result</span> : children;

  return <WordsListWrapper>{Words}</WordsListWrapper>;
};

export default WordList;
