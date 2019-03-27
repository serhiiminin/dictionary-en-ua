import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserIcon } from '..';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import routes from '../../routes';
import loadingNames from '../../constants/loading-names';
import { ReactComponent as Logo } from '../../images/logo.svg';
import styles from './styles';

const Header = ({ classes, isUserLoggedIn, checkIsLoading }) => {
  const isLoading = checkIsLoading(loadingNames.user.fetch);

  return (
    <div className={classes.header}>
      <Link to={routes.root} className={classes.headerLink}>
        <Logo className={classes.logo} />
      </Link>
      {isUserLoggedIn && <UserIcon isLoading={isLoading} />}
    </div>
  );
};

Header.propTypes = {
  classes: composeClassesPropTypes(styles),
  checkIsLoading: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  classes: {},
  isUserLoggedIn: false,
};

export default Header;
