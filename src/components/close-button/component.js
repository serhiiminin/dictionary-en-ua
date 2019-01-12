import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import composeClassesPropTypes from "../../modules/compose-classes-prop-types";
import styles from "./styles";

const CloseButton = ({ onClick, classes }) => (
  <button type="button" className={classes.closeButton} onClick={onClick}>
    <CloseIcon />
  </button>
);

CloseButton.propTypes = {
  classes: composeClassesPropTypes(styles),
  onClick: PropTypes.func.isRequired
};

CloseButton.defaultProps = {
  classes: {}
};

export default CloseButton;
