import React, { Fragment } from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { ButtonWithRouter, FormAddWord, ControlsSeparator } from '../../components';
import { withWords } from '../../context/words';
import routes from '../../routes';
import styles from './styles';

const AddWord = ({ classes }) => (
  <Fragment>
    <ControlsSeparator>
      <ButtonWithRouter to={routes.words.list}>List of my words</ButtonWithRouter>
      <ButtonWithRouter to={routes.words.search}>Search for a new word</ButtonWithRouter>
    </ControlsSeparator>
    <main className={classes.addWord}>
      <FormAddWord/>
    </main>
  </Fragment>
);

AddWord.propTypes = {
  classes: classesShape,
};

AddWord.defaultProps = {
  classes: classesDefaultProps
};

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(AddWord);
