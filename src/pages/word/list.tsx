import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { Fab, Select, MenuItem } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';
import LN from '../../constants/loading-names';
import { TitleBlock, InputWithSearch, WordListItem, WordList, BlocksWrapper } from '../../components';
import { withSearchParams, SI } from '../../context/search-params';
import routes from '../../routes';

type Props = LI & WI & SI;

const WordsList = (props: Props): JSX.Element => {
  const {
    wordsList,
    checkIsLoading,
    handleDeleteWord,
    handleFetchWordsList,
    cleanWordsList,
    searchParams,
    setNewSearchParams,
  } = props;
  const isLoading = checkIsLoading(LN.words.list);
  useEffect((): (() => void) => {
    handleFetchWordsList();

    return cleanWordsList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.filter]);

  return (
    <>
      <BlocksWrapper>
        <>
          <InputWithSearch
            variant="outlined"
            label="search"
            urlValue={searchParams.filter || ''}
            onEnterPress={(filter: string): void => setNewSearchParams(routes.words.list, { filter })}
          />
          <Fab variant="extended" color="primary" aria-label="add">
            <Add />
            add word
          </Fab>
          <Select value={20}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <TitleBlock>Your words</TitleBlock>
        </>
      </BlocksWrapper>
      <WordList>
        {isLoading
          ? Array(searchParams.countPerPage)
              .fill(null)
              .map(
                (): JSX.Element => (
                  <WordListItem
                    key={Math.random()}
                    word={{ _id: '', created: '', updated: '' }}
                    onDelete={handleDeleteWord}
                    filter={searchParams.filter}
                    isLoading={isLoading}
                  />
                )
              )
          : wordsList.map(
              (word): JSX.Element => (
                <WordListItem
                  key={word._id}
                  word={word}
                  onDelete={handleDeleteWord}
                  filter={searchParams.filter}
                  isLoading={isLoading}
                />
              )
            )}
      </WordList>
    </>
  );
};

export default compose<Props, {}>(
  withLoading,
  withSearchParams,
  withWords
)(WordsList);
