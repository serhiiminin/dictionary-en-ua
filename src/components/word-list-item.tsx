import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BlockWrapper from './blocks-wrapper';
import ButtonDelete from './button-delete';
import WordDate from './word-date';
import { ThemeProps, Word } from '../types';
import generateRoute from '../util/routes';
import routes from '../routes';

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

const WordText = styled.span`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.lg};
`;

const WordTranscription = styled.span`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.lg};
  color: ${(props: ThemeProps): string => props.theme.main.color.main};
`;

const WordExample = styled.span`
  font-size: ${(props: ThemeProps): string => props.theme.main.fontSize.sm};
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
        <WordText>
          <Link to={generateRoute(routes.words.preview, { id: word._id })}>{word.word}</Link>
        </WordText>
        <WordTranscription>{`[${word.transcription}]`}</WordTranscription>
        <WordExample>{word.examples && word.examples[0]}</WordExample>
        <span>{word.created && <WordDate date={word.created} />}</span>
      </WordItemInner>
    </BlockWrapper>
  </ItemWrapper>
);

export default WordListItem;
