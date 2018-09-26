import React from 'react';
import PropTypes from 'prop-types';
import { FormAddWord } from '../../components';

const AddWordContainer = ({ classes }) => (
  <main className={classes.addWord}>
    <FormAddWord/>
  </main>
);

AddWordContainer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

AddWordContainer.defaultProps = {
  classes: {}
};

export default AddWordContainer;
