import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Grid, { GridProps } from '@material-ui/core/Grid';
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

const GridContainer = styled((props: GridProps): JSX.Element => <Grid container {...props} />)`
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

const DateWrapper = styled.div`
  text-align: end;
`;

interface Props {
  word: Word;
  onDelete(id: string): void;
}

const WordListItem = ({ word, onDelete }: Props): JSX.Element => (
  <ItemWrapper>
    <BlockWrapper>
      <GridContainer alignItems="center">
        <Grid item xs={1}>
          <ButtonDelete onClick={(): void => onDelete(word._id)} />
        </Grid>
        <Grid item xs={2}>
          <WordText>
            <Link to={generateRoute(routes.words.preview, { id: word._id })}>{word.word}</Link>
          </WordText>
        </Grid>
        <Grid item xs={3}>
          <WordTranscription>{`[${word.transcription}]`}</WordTranscription>
        </Grid>
        <Grid item xs={4}>
          <WordExample>{word.examples && word.examples[0]}</WordExample>
        </Grid>
        <Grid item xs={2}>
          <DateWrapper>{word.created && <WordDate date={word.created} />}</DateWrapper>
        </Grid>
      </GridContainer>
    </BlockWrapper>
  </ItemWrapper>
);

export default WordListItem;
