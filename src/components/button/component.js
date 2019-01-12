import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import composeClassesPropTypes from "../../modules/compose-classes-prop-types";
import styles from "./styles";

const ButtonCustomized = ({ classes, isActive, ...restProps }) => (
  <Button classes={{ root: classes.button }} {...restProps} />
);

ButtonCustomized.propTypes = {
  isActive: PropTypes.bool,
  classes: composeClassesPropTypes(styles)
};

ButtonCustomized.defaultProps = {
  isActive: false,
  classes: {}
};

export default ButtonCustomized;
