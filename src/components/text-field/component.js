import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

const TextFieldCustomized = ({ classes, control, ...restProps }) => (
  <div className={classes.textFieldControl}>
    <TextField
      {...restProps}
      classes={{
        root: classes.root
      }}
      InputProps={{
        classes: {
          underline: classes.underline
        }
      }}
      InputLabelProps={{
        className: classes.label
      }}
    />
    {control}
  </div>
);

TextFieldCustomized.propTypes = {
  classes: composeClassesPropTypes(styles),
  control: PropTypes.node
};

TextFieldCustomized.defaultProps = {
  control: null,
  classes: {}
};

export default TextFieldCustomized;
