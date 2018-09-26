import PropTypes from 'prop-types';
import React from 'react';
import { foundWordInitialState } from '../../context/foundWord';
import { foundWordShape } from '../../context/foundWord/shape';
import { LineExplanation, ListOfClickableStrings } from '..';

const FoundWordDescription = ({ foundWord, pushTextToInput, classes }) => {
  const { en, ua, transcription, partOfSpeech, antonyms, synonyms, similarTo } = foundWord;

  return (
    <div className={classes.foundWordDescription}>
      <div>

        <LineExplanation label='Part of speech'>
          {partOfSpeech && partOfSpeech.join(', ')}
        </LineExplanation>
        <LineExplanation label='English'>{en}</LineExplanation>
        <LineExplanation label='Ukrainian'>{ua}</LineExplanation>
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
        <LineExplanation label='Similar to'>
          <ListOfClickableStrings
            items={similarTo}
            onClick={pushTextToInput}
            delimiter=','
          />
        </LineExplanation>
      </div>
    </div>
  );
};

FoundWordDescription.propTypes = {
  foundWord: foundWordShape,
  pushTextToInput: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

FoundWordDescription.defaultProps = {
  foundWord: foundWordInitialState,
  classes: {},
};

export default FoundWordDescription;
