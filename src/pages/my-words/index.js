import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { Table, ButtonWithRouter } from '../../components';
import styles from './styles';

const MyWords = ({ classes }) => (
  <main className={classes.myWords}>
    <ButtonWithRouter to='/add-word'>Add a new word</ButtonWithRouter>
    <Table />
  </main>
);

MyWords.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(MyWords);
