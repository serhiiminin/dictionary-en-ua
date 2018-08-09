import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { ButtonWithRouter, ControlsSeparator, SearchResult } from '../../components';
import { withWordForm } from '../../context/word-form';
import { withWords } from '../../context/words';
import { TextField } from '../../mui-components';
import routes from '../../routes';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  searchValue: '',
};

class SearchWord extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    foundWord: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    addWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
    cleanFoundWord: PropTypes.func.isRequired,
    onFillForm: PropTypes.func.isRequired,
  };

  state = initialState;

  componentWillUnmount() {
    this.props.cleanFoundWord();
  }

  handleOnChangeSearchInput = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;
    const from = encodeURIComponent(value) === value ? 'en' : 'ru';
    const to = encodeURIComponent(value) === value ? 'ru' : 'en';

    this.setState({ searchValue: value });

    if (!value) {
      const { searchValue } = initialState;

      this.setState({ searchValue });
      return;
    }
    this.inputTimer = setTimeout(() => {
      this.props.searchWord({ text: value, from, to });
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleEditBeforeSaving = () => {
    const { foundWord, onFillForm, history } = this.props;

    this.setState({ ...initialState });
    onFillForm(foundWord)
      .then(history.push(routes.addWord));
  };

  handleAddWordToList = () => {
    const { addWord, foundWord, cleanFoundWord } = this.props;

    return addWord({
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
            value={searchValue}
            placeholder="Search a word"
            onChange={this.handleOnChangeSearchInput}
          />
          <SearchResult
            en={en}
            ru={ru}
            examples={examples}
            transcription={transcription}
            addWord={this.handleAddWordToList}
            editWordBeforeSaving={this.handleEditBeforeSaving}
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
  withWordForm,
);

export default enhance(SearchWord);
