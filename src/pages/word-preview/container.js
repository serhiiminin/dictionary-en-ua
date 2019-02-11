import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { WordPreview } from '../../components';
import loadingNames from '../../constants/loading-names';

class WordPreviewContainer extends Component {
  static propTypes = {
    fetchWord: PropTypes.func.isRequired,
    cleanWord: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    wordItem: PropTypes.shape({}),
  };

  static defaultProps = {
    wordItem: {},
  };

  componentDidMount() {
    const { fetchWord, match } = this.props;

    fetchWord(match.params.id);
  }

  componentWillUnmount() {
    this.props.cleanWord();
  }

  render() {
    const { wordItem, checkIsLoading } = this.props;
    const loading = checkIsLoading(loadingNames.words.fetch);

    return <WordPreview loading={loading} wordItem={wordItem} />;
  }
}

export default WordPreviewContainer;
