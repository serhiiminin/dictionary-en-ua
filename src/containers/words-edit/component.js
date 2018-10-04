import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { WordForm } from '../../components';

class WordEdit extends Component {
  static propTypes = {
    word: PropTypes.shape({}),
    fetchWord: PropTypes.func.isRequired,
    cleanWord: PropTypes.func.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  static defaultProps = {
    word: {}
  };

  componentDidMount() {
    this.props.fetchWord(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.cleanWord()
  }

  render() {
    const { word } = this.props;

    return (
      <WordForm
        word={word}
      />
    )
  }
}

export default WordEdit;
