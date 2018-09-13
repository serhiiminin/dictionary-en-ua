import React from 'react';
import PropTypes from 'prop-types';
import Done from '@material-ui/icons/Done';
import DoneAll from '@material-ui/icons/DoneAll';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import { Button } from '../../components-mui';
import { ControlsSeparator, TextFieldLoading } from '../index';

const LearningBoard = props => {
  const {loading,
    onOptionChange,
    inputValue,
    word,
    timesLearnt,
    onCheckAnswer,
    onGiveAHint,
    onKnownWord,
    onForgottenWord } = props;
  const textLearnt = `Learnt ${timesLearnt} time${timesLearnt > 1 ? 's' : ''} before`;

  return (
    <div>
      <TextFieldLoading
        loading={loading}
        onChange={onOptionChange}
        label='Your option'
        value={inputValue}
        disabled={loading}
      />
      <h3>{word}</h3>
      <h5>{timesLearnt != null && textLearnt }</h5>
      <ControlsSeparator align='center'>
        <Button
          onClick={onCheckAnswer}
          disabled={loading}
          title='Submit my answer'
          variant="fab"
          mini
        >
          <Done/>
        </Button>
        <Button
          onClick={onGiveAHint}
          disabled={loading}
          title='Give me a hint'
          variant="fab"
          mini
        >
          <RemoveRedEye/>
        </Button>
        <Button
          onClick={onKnownWord}
          disabled={loading}
          title='I know this word'
          variant="fab"
          mini
        >
          <DoneAll/>
        </Button>
        <Button
          onClick={onForgottenWord}
          disabled={loading}
          title='I forgot this word, show me the translation'
          variant="fab"
          mini
        >
          <ErrorOutline/>
        </Button>
      </ControlsSeparator>
    </div>
  );
};

LearningBoard.propTypes = {
  loading: PropTypes.bool,
  onOptionChange: PropTypes.func.isRequired,
  onCheckAnswer: PropTypes.func.isRequired,
  onGiveAHint: PropTypes.func.isRequired,
  onKnownWord: PropTypes.func.isRequired,
  onForgottenWord: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  word: PropTypes.string,
  timesLearnt: PropTypes.number,
};

LearningBoard.defaultProps = {
  loading: null,
  inputValue: null,
  word: null,
  timesLearnt: null,
};

export default LearningBoard;
