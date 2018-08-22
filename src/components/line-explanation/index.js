import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const LineExplanation = ({ classes, label, children }) => (
  <div className={classes.lineExplanation}>
    <div className={classes.label}>{`${label}:`}</div>
    <div className={classes.text}>{children}</div>
  </div>
);

LineExplanation.propTypes = {
  classes: classesShape,
  label: PropTypes.node.isRequired,
  children: PropTypes.node,
};

LineExplanation.defaultProps = {
  children: null,
  classes: classesDefaultProps,
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(LineExplanation);
