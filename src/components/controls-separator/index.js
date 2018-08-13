import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import styles from './styles';

const ControlsSeparator = ({ children, classes, align='left' }) => (
  <div className={`${classes.alignControls} ${classes[align]}`}>
    {children}
    </div>
);

ControlsSeparator.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
};

ControlsSeparator.defaultProps = {
  align: 'left',
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(ControlsSeparator);
