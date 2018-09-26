import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HeaderNavigation } from '..';
import routes from '../../routes';

const Header = ({ classes }) => (
  <div className={classes.header}>
    <h1>
      <Link
        to={routes.root}
        className={classes.headerLink}
      >The dictionary</Link>
    </h1>
    <HeaderNavigation/>
  </div>
);

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

Header.defaultProps = {
  classes: {},
};

export default Header;
