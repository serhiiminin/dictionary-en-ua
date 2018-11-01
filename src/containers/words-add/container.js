import React, { Component } from "react";
import PropTypes from "prop-types";
import { WordForm } from "../../components";

class AddWordContainer extends Component {
  componentWillUnmount() {
    this.props.cleanEditingWord();
  }

  render() {
    const { saveWord, editingWord } = this.props;
    return (
      <main>
        <WordForm word={editingWord} onSubmit={word => saveWord(word)} />
      </main>
    );
  }
}

AddWordContainer.propTypes = {
  saveWord: PropTypes.func.isRequired,
  cleanEditingWord: PropTypes.func.isRequired,
  editingWord: PropTypes.shape({})
};

AddWordContainer.defaultProps = {
  editingWord: null
};

export default AddWordContainer;
