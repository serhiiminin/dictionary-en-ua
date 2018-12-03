import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

const Header = ({ classes }) => (
  <div className={classes.header}>
    <h1 className={classes.headerLinkWrapper}>
      <Link to={routes.root} className={classes.headerLink}>
        The dictionary
      </Link>
    </h1>
  </div>
);

Header.propTypes = {
  classes: composeClassesPropTypes(styles)
};

Header.defaultProps = {
  classes: {}
};

export default Header;
