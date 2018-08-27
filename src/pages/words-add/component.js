import React, { Fragment } from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { ButtonWithRouter, FormAddWord, ControlsSeparator } from '../../components';
import routes from '../../routes';

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

export default AddWord;
