import React from "react";
import PropTypes from "prop-types";
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';

const ControlsSeparator = ({ children, classes, align }) => (
  <div className={`${classes.alignControls} ${align}`}>
    {children}
  </div>
);

ControlsSeparator.propTypes = {
  classes: composeClassesPropTypes(styles),
  children: PropTypes.node.isRequired,
  align: PropTypes.string
};

ControlsSeparator.defaultProps = {
  classes: {},
  align: "left"
};

export default ControlsSeparator;
