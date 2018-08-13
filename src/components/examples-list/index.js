import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import styles from './styles';

const ExamplesList = ({ children, classes }) => (
  <ul className={classes.examplesList}>{children}</ul>
);

ExamplesList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(ExamplesList);
