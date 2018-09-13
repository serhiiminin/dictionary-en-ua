import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { ControlsSeparator, TextFieldLoading, FoundWordDescription, FoundWordExamples } from '../../components';
import { foundWordInitialState } from '../../context/foundWord';
import { foundWordShape } from '../../context/foundWord/shape';
import { loadingNamesShape } from '../../context/loading-names/shape';
import loadingNames from '../../constants/loading-names';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';
import { Button } from '../../components-mui';
import { wordsInitialState } from '../../context/words';
import routes from '../../routes';

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
    classes: classesShape,
    foundWord: foundWordShape,
    history: ReactRouterPropTypes.history.isRequired,
    saveWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
    cleanFoundWord: PropTypes.func.isRequired,
    onFillForm: PropTypes.func.isRequired,
    currentLoadingNames: loadingNamesShape,
    gif: PropTypes.string,
  };

  static defaultProps = {
    currentLoadingNames: [],
    foundWord: foundWordInitialState,
    classes: classesDefaultProps,
    gif: wordsInitialState.gif
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
      .then(history.push(routes.words.add));
  };

  handleSaveWord = () => {
    const { saveWord, foundWord, cleanFoundWord } = this.props;

    return saveWord(foundWord)
      .then(() => {
        const { searchValue } = initialState;

        this.setState({ searchValue });
        cleanFoundWord();
      });
  };

  render() {
    const { searchValue } = this.state;
    const { classes, foundWord, currentLoadingNames, gif } = this.props;
    const isEmpty = !Object.keys(foundWord).length;
    const loading = currentLoadingNames.includes(loadingNames.searchWord);

    return (
      <main className={classes.searchWord}>
        {gif && <img src={gif} alt=""/>}
        <div>
          <TextFieldLoading
            label="Search a word"
            value={searchValue}
            onChange={this.handleOnChangeSearchInput}
            loading={loading}
          />
          <ControlsSeparator>
            <Button onClick={this.handleSaveWord} disabled={isEmpty}>Save to my words</Button>
            <Button onClick={this.handleEditBeforeSaving} disabled={isEmpty}>Edit before saving</Button>
          </ControlsSeparator>
          <FoundWordDescription
            foundWord={foundWord}
            pushTextToInput={this.handleSearchWord}
          />
        </div>
        <div>
          <FoundWordExamples
            foundWord={foundWord}
            pushTextToInput={this.handleSearchWord}
          />
        </div>
      </main>
    );
  }
}

export default SearchWord;
