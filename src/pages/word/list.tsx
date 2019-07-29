import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';
import LN from '../../constants/loading-names';
import { TitleBlock, InputWithSearch, WordListItem, WordList, Container, Select } from '../../components';
import { withSearchParams, SI } from '../../context/search-params';
import routes from '../../routes';

const SELECT_CONFIG = [{ value: 'created', title: 'Most recent' }, { value: 'word', title: 'Word' }];

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
  }, [Object.values(searchParams).toString()]);

  const handleSetNewParams = (paramName: string): ((v: string) => void) => (value: string): void => {
    setNewSearchParams(routes.words.list, { [paramName]: value });
  };

  return (
    <>
      <Container>
        <>
          <InputWithSearch
            variant="outlined"
            label="search"
            urlValue={searchParams.filter || ''}
            onEnterPress={handleSetNewParams('filter')}
          />
          <Fab variant="extended" color="primary" aria-label="add">
            <Add />
            add word
          </Fab>
          <Select urlValue={searchParams.sortBy} items={SELECT_CONFIG} onChange={handleSetNewParams('sortBy')} />
          <TitleBlock>Your words</TitleBlock>
        </>
      </Container>
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
