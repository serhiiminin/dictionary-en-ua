import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Container from './container';
import ButtonDelete from './button-delete';
import HighlightedText from './highlighted-text';
import Dialog, { DialogRenderProps } from './dialog';
import WordDate from './word-date';
import { ThemeProps, Word } from '../types';
import generateRoute from '../util/routes';
import routes from '../routes';

const ItemWrapper = styled.div`
  margin-bottom: 10px;
  box-shadow: 6px 6px 18px rgba(123, 123, 123, 0.14);
`;

const GridContainer = styled((props: GridProps): JSX.Element => <Grid container {...props} />)`
  height: 8rem;
`;

const WordLink = styled(Link)`
  text-decoration: none;
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
  filter?: string;
  isLoading: boolean;
}

const Progress = styled.div`
  background: gray;
  opacity: 0.2;
  color: transparent;
  width: 80%;
  border-radius: 0.2em;
  position: relative;
  height: 2rem;
`;

const WordListItem = ({ word, onDelete, filter, isLoading }: Props): JSX.Element => (
  <ItemWrapper>
    <Container>
      <GridContainer alignItems="center">
        <Grid item xs={1}>
          {isLoading ? (
            <Progress />
          ) : (
            <Dialog
              title="Delete word"
              description="Are you sure you want to delete this word?"
              onConfirm={(): void => onDelete(word._id)}
            >
              {({ onOpen }: DialogRenderProps): JSX.Element => <ButtonDelete onClick={onOpen} />}
            </Dialog>
          )}
        </Grid>
        <Grid item xs={2}>
          {isLoading ? (
            <Progress />
          ) : (
            <WordLink to={generateRoute(routes.words.preview, { id: word._id })}>
              {word.word && <HighlightedText text={word.word} pattern={filter || ''} />}
            </WordLink>
          )}
        </Grid>
        <Grid item xs={3}>
          {isLoading ? <Progress /> : <WordTranscription>{`[${word.transcription}]`}</WordTranscription>}
        </Grid>
        <Grid item xs={4}>
          {isLoading ? (
            <Progress />
          ) : (
            <WordExample>
              {word.examples && word.examples[0] && <HighlightedText text={word.examples[0]} pattern={filter || ''} />}
            </WordExample>
          )}
        </Grid>
        <Grid item xs={2}>
          {isLoading ? <Progress /> : <DateWrapper>{word.created && <WordDate date={word.created} />}</DateWrapper>}
        </Grid>
      </GridContainer>
    </Container>
  </ItemWrapper>
);

export default WordListItem;
