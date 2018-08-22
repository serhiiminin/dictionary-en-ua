import React from 'react';
import { Link } from 'react-router-dom';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import routes from '../../routes';

const Header = ({ classes }) => (
  <div className={classes.header}>
    <h1>
      <Link
        to={routes.root}
        className={classes.headerLink}
      >My dictionary</Link>
    </h1>
  </div>
);

Header.propTypes = {
  classes: classesShape,
};

Header.defaultProps = {
  classes: classesDefaultProps
};

export default Header;
