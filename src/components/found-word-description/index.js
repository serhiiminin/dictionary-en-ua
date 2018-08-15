import React from 'react';
import PropTypes from 'prop-types';
import { LineExplanation, ListOfClickableStrings } from '..';
import { foundWordInitialState } from '../../context/foundWord';
import { foundWordShape } from '../../context/foundWord/shape';

const FoundWordDescription = ({ foundWord, pushTextToInput }) => {
  const { en, ru, transcription, partOfSpeech, antonyms, synonyms } = foundWord;

  return (
    <div>
      <LineExplanation label='Part of speech'>{partOfSpeech && partOfSpeech.join(', ')}</LineExplanation>
      <LineExplanation label='English'>{en}</LineExplanation>
      <LineExplanation label='Russian'>{ru}</LineExplanation>
      <LineExplanation label='Transcription'>{transcription}</LineExplanation>
      <LineExplanation label='Synonyms'>
        <ListOfClickableStrings
          items={synonyms}
          onClick={pushTextToInput}
          delimiter=','
        />
      </LineExplanation>
      <LineExplanation label='Antonyms'>
        <ListOfClickableStrings
          items={antonyms}
          onClick={pushTextToInput}
          delimiter=','
        />
      </LineExplanation>
    </div>
  );
};

FoundWordDescription.propTypes = {
  foundWord: foundWordShape,
  pushTextToInput: PropTypes.func.isRequired,
};

FoundWordDescription.defaultProps = {
  foundWord: foundWordInitialState,
};

export default FoundWordDescription;
