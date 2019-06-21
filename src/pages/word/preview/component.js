import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

class WordPreviewContainer extends Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    handleFetchWord: PropTypes.func.isRequired,
    cleanWord: PropTypes.func.isRequired,
    wordItem: PropTypes.shape({
      word: PropTypes.string,
      transcription: PropTypes.string,
      gif: PropTypes.string,
    }),
  };

  static defaultProps = {
    wordItem: {},
  };

  componentDidMount() {
    const { match, handleFetchWord } = this.props;
    const { id } = match.params;

    handleFetchWord(id);
  }

  componentWillUnmount() {
    this.props.cleanWord();
  }

  render() {
    const { wordItem } = this.props;
    const { word, transcription, gif } = wordItem;

    return (
      <div>
        <h1>{word}</h1>
        <p>[{transcription}]</p>
        <img src={gif} alt={word} />
      </div>
    );
  }
}

export default WordPreviewContainer;
