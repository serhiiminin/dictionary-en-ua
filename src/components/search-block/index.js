import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { SearchResult } from '..';
import { withWords } from '../../context/words';
import { TextField } from '../../mui-components';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  inputValue: '',
};

class SearchBlock extends Component {
  static propTypes = {
    foundWord: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  };

  state = initialState;

  handleOnChange = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;
    const from = encodeURIComponent(value) === value ? 'en' : 'ru';
    const to = encodeURIComponent(value) === value ? 'ru' : 'en';

    this.setState({ inputValue: value });
    if (!value) {
      const { inputValue } = initialState;

      this.setState({ inputValue });
      return;
    }
    this.inputTimer = setTimeout(() => {
      this.props.searchWord({ text: value, from, to })
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleAddWordToList = () =>
    this.props.addWord({
      ...this.props.foundWord,
    })
      .then(this.props.clearFoundWord());

  render() {
    const { inputValue } = this.state;
    const { foundWord, classes } = this.props;
    const { ru, en, examples, transcription } = foundWord;

    return (
      <div className={classes.searchBlock}>
        <h3>Try to search</h3>
        <TextField
          value={inputValue}
          placeholder="Search a word"
          onChange={this.handleOnChange}
        />
        <SearchResult
          en={en}
          ru={ru}
          examples={examples}
          transcription={transcription}
          addWordToList={this.handleAddWordToList}
        />
      </div>
    )
  }
}

SearchBlock.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  searchWord: PropTypes.func.isRequired,
  addWord: PropTypes.func.isRequired,
  clearFoundWord: PropTypes.func.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(SearchBlock);
