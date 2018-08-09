import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { ButtonWithRouter, Form, ControlsSeparator } from '../../components';
import { withWords } from '../../context/words';
import routes from '../../routes';
import styles from './styles';

const AddWord = ({ classes }) => (
  <Fragment>
    <ControlsSeparator>
      <ButtonWithRouter to={routes.myWords}>List of my words</ButtonWithRouter>
      <ButtonWithRouter to={routes.searchWord}>Search for a new word</ButtonWithRouter>
    </ControlsSeparator>
    <main className={classes.addWord}>
      <Form/>
    </main>
  </Fragment>
);

AddWord.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(AddWord);
