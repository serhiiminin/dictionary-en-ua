import React from "react";
import trident from "../../images/trident.svg";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

const MainContainer = ({ classes }) => (
  <div className={classes.mainPage}>
    <img src={trident} alt="trident" />
    <div>
      <q className={classes.quoteText}>Учітесь, читайте, І чужому научайтесь, Й свого не цурайтесь</q>
      <p className={classes.quoteAuthor}>Т.Г. Шевченко</p>
    </div>
  </div>
);

MainContainer.propTypes = {
  classes: composeClassesPropTypes(styles)
};

MainContainer.defaultProps = {
  classes: {}
};

export default MainContainer;
