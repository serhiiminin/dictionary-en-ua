import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WordForm } from '../../components';

class AddWordContainer extends Component {
  componentWillUnmount() {
    this.props.cleanEditingWord();
  }

  render() {
    const { classes, saveWord, editingWord } = this.props;
    return (
      <main className={classes.addWord}>
        <WordForm
          word={editingWord}
          onSubmit={word => saveWord(word)}
        />
      </main>
    );
  }
};

AddWordContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  saveWord: PropTypes.func.isRequired,
  cleanEditingWord: PropTypes.func.isRequired,
  editingWord: PropTypes.shape({}),
};

AddWordContainer.defaultProps = {
  classes: {},
  editingWord: null,
};

export default AddWordContainer;
