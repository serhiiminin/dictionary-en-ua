import React from 'react';
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';

const WordsListWrapper = styled.div``;

interface Props {
  children: JSX.Element[];
  isLoading: boolean;
}

const WordList = ({ children, isLoading }: Props): JSX.Element => {
  const Words = children.length === 0 ? <span>You do not have saved words at the moment</span> : children;

  return <WordsListWrapper>{isLoading ? <LinearProgress /> : Words}</WordsListWrapper>;
};

export default WordList;
