import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { Form, SearchBlock } from '../../components';
import styles from './styles';

const AddWord = ({ classes }) => (
  <main className={classes.addWord}>
    <Form />
    <SearchBlock />
  </main>
);

AddWord.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(AddWord);
