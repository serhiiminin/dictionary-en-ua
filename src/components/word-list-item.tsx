import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';
import { distanceInWords, format } from 'date-fns';
import BlockWrapper from './blocks-wrapper';
import ButtonDelete from './button-delete';
import { Word } from '../types';

const ItemWrapper = styled.div`
  margin-bottom: 10px;
  box-shadow: 6px 6px 18px rgba(123, 123, 123, 0.14);
`;

const WordItemInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr 2fr 1fr;
  height: 80px;
`;

interface Props {
  word: Word;
  onDelete(id: string): void;
}

const WordListItem = ({ word, onDelete }: Props): JSX.Element => (
  <ItemWrapper>
    <BlockWrapper>
      <WordItemInner>
        <ButtonDelete onClick={(): void => onDelete(word._id)} />
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
