import React from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { FormAddWord } from '../../components';

const AddWord = ({ classes }) => (
  <main className={classes.addWord}>
    <FormAddWord/>
  </main>
);

AddWord.propTypes = {
  classes: classesShape,
};

AddWord.defaultProps = {
  classes: classesDefaultProps
};

export default AddWord;
