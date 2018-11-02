import React, { Component } from "react";
import PropTypes from "prop-types";
import { WordForm } from "../../components";

class AddWordContainer extends Component {
  componentWillUnmount() {
    this.props.cleanEditingWord();
  }

  render() {
    const { saveWord, editingWord, checkIsLoading } = this.props;
    return (
      <main>
        <WordForm
          word={editingWord}
          checkIsLoading={checkIsLoading}
          onSubmit={word => saveWord(word)}
        />
      </main>
    );
  }
}

AddWordContainer.propTypes = {
  saveWord: PropTypes.func.isRequired,
  checkIsLoading: PropTypes.func.isRequired,
  cleanEditingWord: PropTypes.func.isRequired,
  editingWord: PropTypes.shape({})
};

AddWordContainer.defaultProps = {
  editingWord: null
};

export default AddWordContainer;
