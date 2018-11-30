import React from "react";
import { Link } from "react-router-dom";
import { HeaderNavigation } from "..";
import routes from "../../routes";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

const Header = ({ classes }) => (
  <div className={classes.header}>
    <Link to={routes.root} className={classes.headerLink}>
      The dictionary
    </Link>
    <HeaderNavigation />
  </div>
);

Header.propTypes = {
  classes: composeClassesPropTypes(styles)
};

Header.defaultProps = {
  classes: {}
};

export default Header;
