import React, { Fragment } from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesShape } from '../../defaults/shapes';
import { ButtonWithRouter, FormAddWord, ControlsSeparator } from '../../components';
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
      <FormAddWord/>
    </main>
  </Fragment>
);

AddWord.propTypes = {
  classes: classesShape.isRequired,
};

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(AddWord);
