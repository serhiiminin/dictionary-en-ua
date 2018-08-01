import React, { Component } from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { SearchResult } from '../';
import { TextField } from '../../mui-components';
import { api } from '../../api/fetcher';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  input: '',
  foundTranslation: {
    en: '',
    ru: '',
    examples: [],
    transcription: '',
  }
};

class SearchBlock extends Component {
  state = initialState;

  componentWillUnmount() {
    clearTimeout(this.inputTimer);
  }

  handleOnChange = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;
    const from = encodeURIComponent(value) === value ? 'en' : 'ru';
    const to = encodeURIComponent(value) === value ? 'ru' : 'en';

    this.setState({ input: value });
    if (!value) {
      this.setState({ ...initialState });
      return;
    }
    this.inputTimer = setTimeout(() => {
      api.searchWord({ text: value, from, to })
        .then(response => {
          const { ru, en, transcription, results } = response;
          const examplesList = results && results
            .reduce((res, val) =>
                val.examples
                  ? [...res, ...val.examples]
                  : [...res],
              []);

          this.setState({
            foundTranslation: { en, ru, transcription, examples: examplesList || [], }
          });
        });
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleTextToForm = () => {
    this.props.addWord({ ...this.state.foundTranslation, example: this.state.foundTranslation.examples[0] })
      .then(() => this.props.fetchWords())
      .then(() => this.setState({ ...initialState }));

  };

  render() {
    const { classes } = this.props;
    const { foundTranslation, input } = this.state;

    return (
      <div
        className={classes.searchBlock}
      >
        <h3>Try to search</h3>
        <TextField
          value={input}
          placeholder="Search a word"
          onChange={this.handleOnChange}
        />
        <SearchResult
          handleTextToForm={this.handleTextToForm}
          en={foundTranslation.en}
          ru={foundTranslation.ru}
          examples={foundTranslation.examples}
          transcription={foundTranslation.transcription}/>
      </div>
    );
  }
}


const enhance = compose(
  injectSheet(styles)
);

export default enhance(SearchBlock);
