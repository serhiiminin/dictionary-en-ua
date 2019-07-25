import React from 'react';
import styled from 'styled-components';
import { Tooltip, IconButton } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import { distanceInWords, format } from 'date-fns';
import BlockWrapper from './blocks-wrapper';
import { Word } from '../types';

interface Props {
  word: Word;
}

const ItemWrapper = styled.div`
  border-bottom: 1px solid gray;
  margin-bottom: 20px;
`;

const WordItemInner = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

const WordListItem = ({ word }: Props): JSX.Element => (
  <ItemWrapper>
    <BlockWrapper>
      <WordItemInner>
        <IconButton>
          <DeleteOutline />
        </IconButton>
        <span>{word.word}</span>
        <span>{`[${word.transcription}]`}</span>
        <span>{word.examples && word.examples[0]}</span>
        <span>
          {word.created && (
            <Tooltip title={format(new Date(word.created), 'DD MMM YYYY, HH:mm:ss')} placement="right">
              <span>{distanceInWords(new Date(word.created), new Date(), { includeSeconds: true })}</span>
            </Tooltip>
          )}
        </span>
      </WordItemInner>
    </BlockWrapper>
  </ItemWrapper>
);

export default WordListItem;
