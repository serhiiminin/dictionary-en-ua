import React from "react";
import composeClassesPropTypes from "../../modules/compose-classes-prop-types";
import styles from "./styles";

const MainContainer = ({ classes }) => (
  <div className={classes.mainPage}>
    <h1>This is the dictionary of definitions</h1>
  </div>
);

MainContainer.propTypes = {
  classes: composeClassesPropTypes(styles)
};

MainContainer.defaultProps = {
  classes: {}
};

export default MainContainer;
