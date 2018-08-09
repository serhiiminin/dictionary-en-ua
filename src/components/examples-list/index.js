import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import styles from './styles';

const ExamplesList = ({ children, classes }) => (
  <ul className={classes.examplesList}>{children}</ul>
);

ExamplesList.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(ExamplesList);
