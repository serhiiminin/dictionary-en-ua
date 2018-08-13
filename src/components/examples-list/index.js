import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const ExamplesList = ({ children, classes }) => (
  <ul className={classes.examplesList}>{children}</ul>
);

ExamplesList.propTypes = {
  classes: classesShape.isRequired,
  children: PropTypes.node.isRequired,
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(ExamplesList);
