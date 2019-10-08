import React, { useContext, useEffect } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { TextField, LinearProgress } from '@material-ui/core';
import { parseSearch, joinUrl, mergeSearch } from 'url-joiner';
import styled from 'styled-components';
import { LoadingContext } from '../../context/loading';
import { WordsContext } from '../../context/words';
import { BlockSearch, ButtonSearch, TitleBlock } from '../../components';
import LN from '../../constants/loading-names';
import routes from '../../routes';
import { ThemeProps } from '../../types';

const SearchBlock = styled.div`
  display: grid;
  width: 50rem;
  grid-auto-flow: column;
  gap: ${(props: ThemeProps): string => props.theme.main.space.sm};
`;

const SearchWordContainer = (props: RouteComponentProps): JSX.Element => {
  const { checkIsLoading } = useContext(LoadingContext);
  const { wordItem, handleCreateWord, handleSearchWord, cleanWord } = useContext(WordsContext);
  const { location } = props;
  const { options } = wordItem;
  const isLoading = checkIsLoading(LN.words.search);
  const handleSearch = (): void => {
    const { query } = parseSearch(location.search);
    if (query) {
      handleSearchWord(query);
    }
  };
  useEffect((): (() => void) => {
    handleSearch();
    return cleanWord;
  }, [location.search]);

  return (
    <>
      <TitleBlock>Search</TitleBlock>
      <BlockSearch>
        {({ linkTo, searchValue, handleOnChange, handleOnEnterPress }): JSX.Element => (
          <SearchBlock>
            <TextField
              label="your word"
              value={searchValue}
              onChange={handleOnChange}
              onKeyUp={handleOnEnterPress}
              variant="outlined"
            />
            <ButtonSearch component={Link} to={linkTo} disabled={!searchValue} variant="contained" color="primary">
              search
            </ButtonSearch>
          </SearchBlock>
        )}
      </BlockSearch>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <p>{wordItem.word}</p>
          <p>Maybe you meant:</p>
          <ul>
            {options &&
              options.map(
                (item): JSX.Element => {
                  const query = encodeURIComponent(item).replace(/%20/gi, '+');
                  const to = joinUrl(routes.words.search, mergeSearch({ query }));

                  return (
                    <li key={to}>
                      <Link to={to}>{item}</Link>
                    </li>
                  );
                }
              )}
          </ul>
          <p>{wordItem.transcription}</p>
          <img src={wordItem.gif} alt={wordItem.word} />
          <ButtonSearch onClick={handleCreateWord}>Save</ButtonSearch>
        </>
      )}
    </>
  );
};

export default withRouter(SearchWordContainer);
