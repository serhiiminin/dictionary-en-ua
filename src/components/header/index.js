import React from 'react';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { classesShape } from '../../defaults/shapes';
import routes from '../../routes';
import styles from './styles';

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
  classes: classesShape.isRequired,
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(Header);
