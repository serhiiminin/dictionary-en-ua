import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { ControlsSeparator, TextFieldLoading, FoundImage } from '../../components';
import loadingNames from '../../constants/loading-names';
import { Button } from '../../components-mui';
import { parseSearchParams } from '../../helpers/search-params';
import routes from '../../routes';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  searchValue: '',
  gif: '',
};

const EN = 'en';
const UK = 'uk';

const composeSearchData = text => {
  const translatingWord = text.trim();
  const from = encodeURIComponent(translatingWord) === translatingWord ? EN : UK;
  const to = encodeURIComponent(translatingWord) === translatingWord ? UK : EN;

  return { text: translatingWord, from, to };
};

class SearchWordContainer extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    foundWord: PropTypes.shape({
      en: PropTypes.string,
    }),
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    saveWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
    cleanFoundWord: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
  };

  static defaultProps = {
    foundWord: {},
    classes: {},
  };

  state = initialState;

  componentDidMount() {
    const { location } = this.props;
    const searchParams = parseSearchParams(location.search);

    if (searchParams.query) {
      this.searchWord(searchParams.query);
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const searchParams = parseSearchParams(location.search);

    if (this.props.location.search !== prevProps.location.search && searchParams.query) {
      this.searchWord(searchParams.query);
    }
  }

  componentWillUnmount() {
    this.props.cleanFoundWord();
  }

  searchWord = text => {
    clearTimeout(this.inputTimer);
    this.setState({ searchValue: text });
    this.inputTimer = setTimeout(() => {
      this.props.searchWord(composeSearchData(text));
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleOnChangeSearchInput = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;

    this.setState({ searchValue: value });

    this.inputTimer = setTimeout(() => {
      this.props.history.push(`${routes.words.search}?query=${value}`);
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleEditBeforeSaving = () => {
    const { history } = this.props;

    this.setState({ ...initialState })
      .then(history.push(routes.words.add));
  };

  handleSaveWord = () => {
    const { saveWord, foundWord, cleanFoundWord } = this.props;

    return saveWord(foundWord)
      .then(() => cleanFoundWord());
  };

  render() {
    const { searchValue } = this.state;
    const { classes, foundWord, checkIsLoading } = this.props;
    const isEmpty = !Object.keys(foundWord).length;
    const loading = checkIsLoading(loadingNames.searchWord);

    return (
      <main className={classes.searchWord}>
        <div>
          <TextFieldLoading
            label="Search a word"
            value={searchValue}
            onChange={this.handleOnChangeSearchInput}
            loading={loading}
          />
          <ControlsSeparator align='right'>
            <Button onClick={this.handleSaveWord} disabled={isEmpty}>Save to my words</Button>
            <Button onClick={this.handleEditBeforeSaving} disabled={isEmpty}>Edit before saving</Button>
          </ControlsSeparator>
          <div className={classes.image}>
            <FoundImage url={foundWord.gif}/>
          </div>
        </div>
      </main>
    );
  }
}

export default SearchWordContainer;
