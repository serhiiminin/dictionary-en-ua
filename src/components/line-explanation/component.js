import React from "react";
import PropTypes from "prop-types";
import composeClassesPropTypes from "../../modules/compose-classes-prop-types";
import styles from "./styles";

const LineExplanation = ({ classes, label, children }) => (
  <div className={classes.lineExplanation}>
    {label && <div>{`${label}:`}</div>}
    <div>{children}</div>
  </div>
);

LineExplanation.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  classes: composeClassesPropTypes(styles)
};

LineExplanation.defaultProps = {
  label: null,
  children: null,
  classes: {}
};

export default LineExplanation;
