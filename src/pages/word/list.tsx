import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { TextField, Fab, Select, MenuItem } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';
import LN from '../../constants/loading-names';
import { TitleBlock, WordListItem, WordList, BlocksWrapper } from '../../components';

type Props = LI & WI;

const WordsList = (props: Props): JSX.Element => {
  const { wordsList, checkIsLoading, handleDeleteWord, handleFetchWordsList, cleanWordsList } = props;
  const isLoading = checkIsLoading(LN.words.list);
  useEffect((): (() => void) => {
    handleFetchWordsList();

    return cleanWordsList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BlocksWrapper>
        <>
          <TextField variant="outlined" label="search" />
          <Fab variant="extended" color="primary" aria-label="add">
            <Add />
            add word
          </Fab>
          <Select
            value=""
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <TitleBlock>Your words</TitleBlock>
        </>
      </BlocksWrapper>
      <WordList isLoading={isLoading}>
        {wordsList.map(
          (word): JSX.Element => (
            <WordListItem key={word._id} word={word} onDelete={handleDeleteWord} />
          )
        )}
      </WordList>
    </>
  );
};

export default compose<Props, {}>(
  withLoading,
  withWords
)(WordsList);
