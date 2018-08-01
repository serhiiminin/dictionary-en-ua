import React, { Component } from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { SearchResult } from '../';
import { TextField } from '../../mui-components';
import { api } from '../../api/fetcher';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

class SearchBlock extends Component {
  state = {
    foundTranslation: {
      en: '',
      ru: '',
      example: [],
      transcription: '',
    }
  };

  componentWillUnmount() {
    clearTimeout(this.inputTimer);
  }

  handleOnChange = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;
    const from = encodeURIComponent(value) === value ? 'en' : 'ru';
    const to = encodeURIComponent(value) === value ? 'ru' : 'en';
    console.log(value, from, to);
    this.inputTimer = setTimeout(() => {
      api.searchWord({ text: value, from, to })
        .then(response => {
          const { ru, en, transcription, results } = response;
          const examplesList = results && results
            .reduce((res, val) =>
              val.examples
                ? [ ...res, ...val.examples]
                : [ ...res ],
              []);

          console.log(en, ru, transcription, examplesList);
          this.setState({
            foundTranslation: {
              en,
              ru,
              transcription,
              example: examplesList || [],
            }
          })

        });
    }, SEARCH_INPUT_TIMEOUT);
  };

  render() {
    const { classes } = this.props;
    const { foundTranslation } = this.state;
    return (
      <div
        className={classes.searchBlock}
      >
        <h3>Try to search</h3>
        <TextField
          placeholder="Search a word"
          onChange={this.handleOnChange}
        />
        <SearchResult
          en={foundTranslation.en}
          ru={foundTranslation.ru}
          example={foundTranslation.example}
          transcription={foundTranslation.transcription} />
      </div>
    );
  }
}


const enhance = compose(
  injectSheet(styles)
);

export default enhance(SearchBlock);
