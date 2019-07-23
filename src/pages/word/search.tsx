import React, { Component } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { TextField, LinearProgress } from '@material-ui/core';
import { parseSearch, joinUrl, mergeSearch } from 'url-joiner';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';
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

type Props = RouteComponentProps & LI & WI;

class SearchWordContainer extends Component<Props, {}> {
  public componentDidMount(): void {
    this.handleSearch();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.location.search !== this.props.location.search) {
      this.handleSearch();
    }
  }

  public componentWillUnmount(): void {
    this.props.cleanWord();
  }

  private handleSearch = (): void => {
    const { location, handleSearchWord } = this.props;
    const { query } = parseSearch(location.search);

    if (query) {
      handleSearchWord(query);
    }
  };

  public render(): JSX.Element {
    const { wordItem, checkIsLoading, handleCreateWord } = this.props;
    const { options } = wordItem;
    const isLoading = checkIsLoading(LN.words.search);

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
  }
}

export default compose<Props, {}>(
  withRouter,
  withLoading,
  withWords
)(SearchWordContainer);
