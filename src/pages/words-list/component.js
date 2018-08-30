import React from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { Table } from '../../components';

const MyWords = ({ classes }) => (
  <main className={classes.myWords}>
    <Table/>
  </main>
);

MyWords.propTypes = {
  classes: classesShape,
};

MyWords.defaultProps = {
  classes: classesDefaultProps
};

export default MyWords;
