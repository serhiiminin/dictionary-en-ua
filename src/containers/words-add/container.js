import React from 'react';
import PropTypes from 'prop-types';
import { WordForm } from '../../components';

const AddWordContainer = ({ classes, saveWord }) => (
  <main className={classes.addWord}>
    <WordForm onSubmit={word => saveWord(word)} />
  </main>
);

AddWordContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  saveWord: PropTypes.func.isRequired,
};

AddWordContainer.defaultProps = {
  classes: {}
};

export default AddWordContainer;
