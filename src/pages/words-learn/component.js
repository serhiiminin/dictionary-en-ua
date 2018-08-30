import { Fade, LinearProgress } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DoneAll from '@material-ui/icons/DoneAll';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { notificationType } from '../../components/notification-item/component';
import { loadingNamesInitialState } from '../../context/loading-names';
import { loadingNamesShape } from '../../context/loading-names/shape';
import { wordsInitialState } from '../../context/words';
import { wordsListShape } from '../../context/words/shape';
import loadingNames from '../../defaults/loading-names';
import { Button } from '../../components-mui';

class LearnWords extends Component {
  static propTypes = {
    fetchWordsToLearn: PropTypes.func.isRequired,
    cleanWords: PropTypes.func.isRequired,
    relearnWord: PropTypes.func.isRequired,
    showNotification: PropTypes.func.isRequired,
    currentLoadingNames: loadingNamesShape,
    words: wordsListShape,
  };

  static defaultProps = {
    words: wordsInitialState,
    currentLoadingNames: loadingNamesInitialState,
  };

  // state={
  //   countOfTry: 0,
  //   guessed: false,
  //   hintValue: '',
  // };

  componentDidMount() {
    this.props.fetchWordsToLearn()
  }

  componentWillUnmount() {
    this.props.cleanWords();
  }

  render() {
    const { words, relearnWord, currentLoadingNames, showNotification } = this.props;
    const loading = currentLoadingNames.includes(loadingNames.learnWord);
    const displayedWord = words && words[0];

    return (
      <div>
        <Fade
          in={loading}
          style={{ transitionDelay: loading ? '300ms' : '' }}
        >
          <LinearProgress color='secondary'/>
        </Fade>
        <h3>{displayedWord && displayedWord.ru}</h3>
        <div>
          <Button
            onClick={() => showNotification('Wrong! 2 attempts left', notificationType.info)}
            title='I know this word'
            variant="fab"
            mini
          >
            <DoneAll/>
          </Button>
          <Button
            title='Give me a hint'
            variant="fab"
            mini
          >
            <RemoveRedEye />
          </Button>
          <Button
            onClick={() => relearnWord(displayedWord._id)}
            title='I forgot this word, need to repeat'
            variant="fab"
            mini
          >
            <ErrorOutline/>
          </Button>

        </div>
      </div>
    )
  }
}

export default LearnWords;
