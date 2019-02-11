import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { WordForm } from '../../components';

class WordEdit extends Component {
  static propTypes = {
    wordItem: PropTypes.shape({}),
    fetchWord: PropTypes.func.isRequired,
    cleanWord: PropTypes.func.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    editWord: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
  };

  static defaultProps = {
    wordItem: null,
  };

  componentDidMount() {
    this.props.fetchWord(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.cleanWord();
  }

  render() {
    const { wordItem, editWord, checkIsLoading } = this.props;

    return (
      <WordForm
        wordItem={wordItem}
        onSubmit={editWord}
        checkIsLoading={checkIsLoading}
      />
    );
  }
}

export default WordEdit;
