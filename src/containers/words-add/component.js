import React from 'react';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';
import { FormAddWord } from '../../components';

const AddWordContainer = ({ classes }) => (
  <main className={classes.addWord}>
    <FormAddWord/>
  </main>
);

AddWordContainer.propTypes = {
  classes: classesShape,
};

AddWordContainer.defaultProps = {
  classes: classesDefaultProps
};

export default AddWordContainer;
