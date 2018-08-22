import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { Table, ButtonWithRouter, ControlsSeparator } from '../../components';
import routes from '../../routes';
import styles from './styles';

const MyWords = ({ classes }) => (
  <main className={classes.myWords}>
    <ControlsSeparator align='right'>
      <ButtonWithRouter to={routes.addWord}>Add a new word</ButtonWithRouter>
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

const enhance = compose(
  injectSheet(styles),
);

export default enhance(MyWords);
