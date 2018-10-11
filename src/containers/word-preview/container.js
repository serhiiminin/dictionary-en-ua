import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Fade, LinearProgress } from '@material-ui/core';
import { InputsBlock, LineExplanation, ListOfSearchableWords } from '../../components';
import loadingNames from '../../constants/loading-names';

const mapValues = items => items
  .map(item => item.value)
  .filter(Boolean);

class WordPreviewContainer extends Component {
  static propTypes = {
    fetchWord: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    word: PropTypes.shape({
      en: PropTypes.string,
      uk: PropTypes.string,
      transcription: PropTypes.string,
      examples: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      })),
      synonyms: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      })),
      antonyms: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      })),
      partOfSpeech: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      })),
      similarTo: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string,
      })),
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
            <ListOfSearchableWords
              items={partOfSpeech && mapValues(partOfSpeech)}
            />
          </LineExplanation>
          <LineExplanation label='Synonyms'>
            <ListOfSearchableWords
              items={synonyms && mapValues(synonyms)}
            />
          </LineExplanation>
          <LineExplanation label='Antonyms'>
            <ListOfSearchableWords
              items={antonyms && mapValues(antonyms)}
            />
          </LineExplanation>
          <LineExplanation label='Similar to'>
            <ListOfSearchableWords
              items={similarTo && mapValues(similarTo)}
            />
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
