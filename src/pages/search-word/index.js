import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { ButtonWithRouter, ControlsSeparator, SearchResult, TextFieldLoading } from '../../components';
import { foundWordInitialState, withFoundWord } from '../../context/foundWord';
import { foundWordShape } from '../../context/foundWord/shape';
import { withLoadingNames } from '../../context/loading-names';
import { withWordForm } from '../../context/word-form';
import { withWords } from '../../context/words';
import { loadingNames } from '../../defaults';
import routes from '../../routes';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  searchValue: '',
};

const composeSearchData = text => {
  const translatingWord = text.trim();
  const from = encodeURIComponent(translatingWord) === translatingWord ? 'en' : 'ru';
  const to = encodeURIComponent(translatingWord) === translatingWord ? 'ru' : 'en';

  return { text: translatingWord, from, to }
};

class SearchWord extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    foundWord: foundWordShape,
    history: ReactRouterPropTypes.history.isRequired,
    saveWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
    cleanFoundWord: PropTypes.func.isRequired,
    onFillForm: PropTypes.func.isRequired,
    currentLoadingNames: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    currentLoadingNames: [],
    foundWord: foundWordInitialState,
  };

  state = initialState;

  componentWillUnmount() {
    this.props.cleanFoundWord();
  }

  handleSearchWord = text => {
    clearTimeout(this.inputTimer);
    this.setState({ searchValue: text });
    this.inputTimer = setTimeout(() => {
      this.props.searchWord(composeSearchData(text))
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleOnChangeSearchInput = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;

    this.setState({ searchValue: value });

    if (!value) {
      const { searchValue } = initialState;

      this.setState({ searchValue });
      return;
    }
    this.handleSearchWord(value);
  };

  handleEditBeforeSaving = () => {
    const { foundWord, onFillForm, history } = this.props;

    this.setState({ ...initialState });
    onFillForm(foundWord)
      .then(history.push(routes.addWord));
  };

  handleSaveWord = () => {
    const { saveWord, foundWord, cleanFoundWord } = this.props;

    return saveWord(foundWord)
      .then(cleanFoundWord());
  };

  render() {
    const { searchValue } = this.state;
    const { classes, foundWord, currentLoadingNames } = this.props;
    const { en, ru, examples, transcription } = foundWord;
    const loading = currentLoadingNames.includes(loadingNames.searchWord);

    return (
      <Fragment>
        <ControlsSeparator>
          <ButtonWithRouter to={routes.myWords}>List of my words</ButtonWithRouter>
        </ControlsSeparator>
        <main className={classes.searchWord}>
          <TextFieldLoading
            label="Search a word"
            value={searchValue}
            onChange={this.handleOnChangeSearchInput}
            loading={loading}
          />
          <SearchResult
            en={en}
            ru={ru}
            examples={examples}
            transcription={transcription}
            saveWord={this.handleSaveWord}
            editWordBeforeSaving={this.handleEditBeforeSaving}
            pushWordToInput={this.handleSearchWord}
          />
        </main>
      </Fragment>
    );
  }
}

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withLoadingNames,
  withWords,
  withFoundWord,
  withWordForm,
);

export default enhance(SearchWord);
