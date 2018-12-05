import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { UserIcon } from "..";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import styles from "./styles";

const Header = ({ classes, isUserLoggedIn }) => (
  <div className={classes.header}>
    <h1 className={classes.headerLinkWrapper}>
      <Link to={routes.root} className={classes.headerLink}>
        The dictionary
      </Link>
    </h1>
    {isUserLoggedIn && <UserIcon />}
  </div>
);

Header.propTypes = {
  classes: composeClassesPropTypes(styles),
  isUserLoggedIn: PropTypes.bool
};

Header.defaultProps = {
  classes: {},
  isUserLoggedIn: false
};

export default Header;
