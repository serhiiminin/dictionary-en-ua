import React from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { Table, ButtonWithRouter, ControlsSeparator } from '../../components';
import routes from '../../routes';

const MyWords = ({ classes }) => (
  <main className={classes.myWords}>
    <ControlsSeparator align='right'>
      <ButtonWithRouter to={routes.words.learn}>Learn words</ButtonWithRouter>
      <ButtonWithRouter to={routes.words.add}>Add a new word</ButtonWithRouter>
    </ControlsSeparator>
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
