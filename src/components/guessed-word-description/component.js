import React from 'react';
import PropTypes from 'prop-types';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import { wordShape } from '../../context/words/shape';
import { ControlsSeparator, ButtonControl } from '..';

const GuessedWordDescription = ({ word, onLearnNextWord }) => {
  const { en, ua, transcription } = word;

  return (
    <div>
      <div>{en}</div>
      <div>{ua}</div>
      <div>{transcription}</div>
      <ControlsSeparator align='center'>
        <ButtonControl
          onClick={onLearnNextWord}
          title='Submit my answer'
        >
          <TrendingFlat/>
        </ButtonControl>
      </ControlsSeparator>
    </div>
  );
};

GuessedWordDescription.propTypes = {
  word: wordShape,
  onLearnNextWord: PropTypes.func.isRequired,
};

GuessedWordDescription.defaultProps = {
  word: {},
};

export default GuessedWordDescription;
