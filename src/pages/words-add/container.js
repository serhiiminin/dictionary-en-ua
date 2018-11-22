import React, { Component } from "react";
import PropTypes from "prop-types";
import { WordForm } from "../../components";
import wordShape from '../../constants/shapes';

class AddWordContainer extends Component {
  componentWillUnmount() {
    this.props.cleanWord();
  }

  render() {
    const { saveWord, word, checkIsLoading } = this.props;
    
    return (
      <WordForm
        word={word}
        checkIsLoading={checkIsLoading}
        onSubmit={saveWord}
      />
    );
  }
}

AddWordContainer.propTypes = {
  saveWord: PropTypes.func.isRequired,
  checkIsLoading: PropTypes.func.isRequired,
  cleanWord: PropTypes.func.isRequired,
  word: wordShape(PropTypes),
};

AddWordContainer.defaultProps = {
  word: {}
};

export default AddWordContainer;
