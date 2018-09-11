import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderNavigation } from '..';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';
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
  classes: classesShape,
};

Header.defaultProps = {
  classes: classesDefaultProps
};

export default Header;
