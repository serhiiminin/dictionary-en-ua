import { Fade, LinearProgress } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadingNamesInitialState } from '../../context/loading-names';
import { loadingNamesShape } from '../../context/loading-names/shape';
import { wordsInitialState } from '../../context/words';
import { wordsListShape } from '../../context/words/shape';
import loadingNames from '../../defaults/loading-names';

class LearnWords extends Component {
  static propTypes = {
    fetchWordsToLearn: PropTypes.func.isRequired,
    cleanWords: PropTypes.func.isRequired,
    relearnWord: PropTypes.func.isRequired,
    currentLoadingNames: loadingNamesShape,
    words: wordsListShape,
  };

  static defaultProps = {
    words: wordsInitialState,
    currentLoadingNames: loadingNamesInitialState,
  };

  componentDidMount() {
    this.props.fetchWordsToLearn()
  }

  componentWillUnmount() {
    this.props.cleanWords();
  }

  render() {
    const { words, relearnWord, currentLoadingNames } = this.props;
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
        <input type="button" onClick={relearnWord} value='relearn'/>
        <div>
          {displayedWord && displayedWord._id}
        </div>
      </div>
    )
  }
}

export default LearnWords;
