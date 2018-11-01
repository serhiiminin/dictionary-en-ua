import React from 'react';
import PropTypes from 'prop-types';
import { Fade, LinearProgress } from '@material-ui/core';
import { InputsBlock, LineExplanation, ListOfSearchableWords, Image } from '..';


const mapValues = items => items
  .map(item => item.value)
  .filter(Boolean);

const WordPreview = ({ word, loading }) => {
  const { en, ua, transcription, partOfSpeech, synonyms, antonyms, similarTo, examples, gif } = word;
  return (
    <div>
      <Fade in={loading}>
        <LinearProgress color='secondary'/>
      </Fade>
      <InputsBlock title="Main information">
        <Image src={gif} alt={en} />
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
};

WordPreview.propTypes = {
  word: PropTypes.shape({
    en: PropTypes.string,
    ua: PropTypes.string,
    transcription: PropTypes.string,
    gif: PropTypes.string,
    partOfSpeech: PropTypes.arrayOf(PropTypes.shape({
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
    similarTo: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })),
    examples: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string,
    })),
  }),
  loading: PropTypes.bool,
};

WordPreview.defaultProps = {
  word: {},
  loading: false,
};

export default WordPreview;

