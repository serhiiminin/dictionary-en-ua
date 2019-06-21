import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TextField, LinearProgress } from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';
import { parseSearch, joinUrl, mergeSearch } from 'url-joiner';
import { BlockSearch, ButtonSearch, TitleBlock } from '../../../components';
import LN from '../../../constants/loading-names';
import routes from '../../../routes';
import SC from './styles';

class SearchWordContainer extends Component {
  static propTypes = {
    location: ReactRouterPropTypes.location.isRequired,
    handleCreateWord: PropTypes.func.isRequired,
    handleSearchWord: PropTypes.func.isRequired,
    cleanWord: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    wordItem: PropTypes.shape({}),
  };

  static defaultProps = {
    wordItem: {},
  };

  componentDidMount() {
    this.handleSearch();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.handleSearch();
    }
  }

  componentWillUnmount() {
    this.props.cleanWord();
  }

  handleSearch = () => {
    const { location, handleSearchWord } = this.props;
    const { query } = parseSearch(location.search);

    if (query) {
      handleSearchWord(query);
    }
  };

  render() {
    const { wordItem, checkIsLoading, handleCreateWord } = this.props;
    const { options } = wordItem;
    const isLoading = checkIsLoading(LN.words.search);

    return (
      <>
        <TitleBlock>Search</TitleBlock>
        <BlockSearch>
          {({ linkTo, searchValue, handleOnChange, handleOnEnterPress }) => (
            <SC.SearchBlock>
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
            </SC.SearchBlock>
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
                options.map(item => {
                  const query = encodeURIComponent(item).replace(/%20/gi, '+');
                  const to = joinUrl(routes.words.search, mergeSearch({ query }));

                  return (
                    <li key={to}>
                      <Link to={to}>{item}</Link>
                    </li>
                  );
                })}
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

export default SearchWordContainer;
