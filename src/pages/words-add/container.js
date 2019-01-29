import React, { Component } from "react";
import PropTypes from "prop-types";
import { WordForm } from "../../components";
import wordShape from "../../constants/shapes";

class AddWordContainer extends Component {
  componentWillUnmount() {
    this.props.cleanWord();
  }

  render() {
    const { saveWord, wordItem, checkIsLoading } = this.props;

    return (
      <WordForm wordItem={wordItem} checkIsLoading={checkIsLoading} onSubmit={saveWord} />
    );
  }
}

AddWordContainer.propTypes = {
  saveWord: PropTypes.func.isRequired,
  checkIsLoading: PropTypes.func.isRequired,
  cleanWord: PropTypes.func.isRequired,
  wordItem: wordShape(PropTypes),
};

AddWordContainer.defaultProps = {
  wordItem: null,
};

export default AddWordContainer;
