import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { UserIcon } from "..";
import composeClassesPropTypes from "../../helpers/compose-classes-prop-types";
import routes from "../../routes";
import styles from "./styles";
import loadingNames from "../../constants/loading-names";

const Header = ({ classes, isUserLoggedIn, checkIsLoading }) => {
  const isLoading = checkIsLoading(loadingNames.user.fetch);
  
  return (
    <div className={classes.header}>
      <h1 className={classes.headerLinkWrapper}>
        <Link to={routes.root} className={classes.headerLink}>
          The dictionary
        </Link>
      </h1>
      {isUserLoggedIn && <UserIcon isLoading={isLoading} />}
    </div>
  );
};

Header.propTypes = {
  classes: composeClassesPropTypes(styles),
  checkIsLoading: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool
};

Header.defaultProps = {
  classes: {},
  isUserLoggedIn: false
};

export default Header;
