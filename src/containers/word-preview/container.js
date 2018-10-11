import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Fade, LinearProgress } from '@material-ui/core';
import loadingNames from '../../constants/loading-names';

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
    const loading = checkIsLoading(loadingNames.fetchWord);

    return (
      <div>
        <Fade in={loading}>
          <LinearProgress color='secondary'/>
        </Fade>
        <div>English: {word.en}</div>
        <div>Ukrainian: {word.ua}</div>
        <div>Transcription: {word.transcription && `[${word.transcription}]`}</div>
      </div>
    );
  }
}

export default WordPreviewContainer;
