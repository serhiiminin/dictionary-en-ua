import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { ButtonWithRouter, ControlsSeparator, SearchResult } from '../../components';
import { withFoundWord } from '../../context/foundWord';
import { withWordForm } from '../../context/word-form';
import { withWords } from '../../context/words';
import { TextField } from '../../mui-components';
import routes from '../../routes';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  searchValue: '',
};

const composeSearchData = text => {
  const from = encodeURIComponent(text) === text ? 'en' : 'ru';
  const to = encodeURIComponent(text) === text ? 'ru' : 'en';

  return { text, from, to }
};

class SearchWord extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    foundWord: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    saveWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
    cleanFoundWord: PropTypes.func.isRequired,
    onFillForm: PropTypes.func.isRequired,
    setFoundWord: PropTypes.func.isRequired,
  };

  state = initialState;

  componentWillUnmount() {
    this.props.cleanFoundWord();
  }

  handleSearchWord = text => {
    clearTimeout(this.inputTimer);
    this.setState({ searchValue: text });
    this.inputTimer = setTimeout(() => {
      const { searchWord, setFoundWord } = this.props;

      searchWord(composeSearchData(text))
        .then(foundWord => setFoundWord(foundWord))
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

  handleSaveWordList = () => {
    const { saveWord, foundWord, cleanFoundWord } = this.props;

    return saveWord({
      ...foundWord,
    })
      .then(cleanFoundWord());
  };

  render() {
    const { searchValue } = this.state;
    const { classes, foundWord } = this.props;
    const { en, ru, examples, transcription } = foundWord;

    return (
      <Fragment>
        <ControlsSeparator>
          <ButtonWithRouter to={routes.myWords}>List of my words</ButtonWithRouter>
        </ControlsSeparator>
        <main className={classes.searchWord}>
          <TextField
            label="Search a word"
            value={searchValue}
            onChange={this.handleOnChangeSearchInput}
          />
          <SearchResult
            en={en}
            ru={ru}
            examples={examples}
            transcription={transcription}
            saveWord={this.handleSaveWordList}
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
  withWords,
  withFoundWord,
  withWordForm,
);

export default enhance(SearchWord);
