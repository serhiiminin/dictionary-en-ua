import React from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';
import styles from './styles';

const Header = ({ classes }) => (
  <div className={classes.header}>
    <h1>
      <Link
        to='/'
        className={classes.headerLink}
      >My dictionary</Link>
    </h1>
  </div>
);

const enhance = compose(
  injectSheet(styles)
);

export default enhance(Header);
