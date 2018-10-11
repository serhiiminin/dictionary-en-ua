import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Fade, LinearProgress } from '@material-ui/core';
import { InputsBlock, LineExplanation } from '../../components';
import loadingNames from '../../constants/loading-names';

const joinItemsByComma = items => items
  .map(item => item.value)
  .filter(Boolean)
  .join(',');

class WordPreviewContainer extends Component {
  static propTypes = {
    fetchWord: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    word: PropTypes.shape({
      en: PropTypes.string,
    }),
  };

  static defaultProps = {
    word: {},
  };

  componentDidMount() {
    const { fetchWord, match } = this.props;

    fetchWord(match.params.id);
  }

  render() {
    const { word, checkIsLoading } = this.props;
    const { en, ua, transcription, partOfSpeech, antonyms, synonyms, similarTo, examples } = word;
    const loading = checkIsLoading(loadingNames.fetchWord);

    return (
      <div>
        <Fade in={loading}>
          <LinearProgress color='secondary'/>
        </Fade>
        <InputsBlock title="Main information">
          <LineExplanation label='English'>{en}</LineExplanation>
          <LineExplanation label='Ukrainian'>{ua}</LineExplanation>
          <LineExplanation label='Transcription'>
            {transcription && `[${transcription}]`}
          </LineExplanation>
          <LineExplanation label='Part of speech'>
            {partOfSpeech && joinItemsByComma(partOfSpeech)}
          </LineExplanation>
          <LineExplanation label='Synonyms'>
            {synonyms && joinItemsByComma(synonyms)}
          </LineExplanation>
          <LineExplanation label='Antonyms'>
            {antonyms && joinItemsByComma(antonyms)}
          </LineExplanation>
          <LineExplanation label='Similar to'>
            {similarTo && joinItemsByComma(similarTo)}
          </LineExplanation>
        </InputsBlock>
        <InputsBlock title="Examples">
          {examples ?
            examples.map(example => (
              <LineExplanation key={example.id}>
                {example.value}
              </LineExplanation>
            ))
          : ''}
        </InputsBlock>
      </div>
    );
  }
}

export default WordPreviewContainer;
