import React from 'react';
import PropTypes from 'prop-types';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import { Button } from '../../components-mui';
import { wordShape } from '../../context/words/shape';
import { ControlsSeparator } from '../index';

const GuessedWordDescription = ({ word, onLearnNextWord }) => {
  const { en, ua, transcription } = word;

  return (
    <div>
      <div>{en}</div>
      <div>{ua}</div>
      <div>{transcription}</div>
      <ControlsSeparator align='center'>
        <Button
          onClick={onLearnNextWord}
          title='Submit my answer'
          variant="fab"
          mini
        >
          <TrendingFlat/>
        </Button>
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
