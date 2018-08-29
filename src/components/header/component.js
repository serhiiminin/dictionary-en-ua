import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import List from '@material-ui/icons/List';
import NoteAdd from '@material-ui/icons/NoteAdd';
import Search from '@material-ui/icons/Search';

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
      <Button variant="fab" mini>
        <List/>
      </Button>
      <Button variant="fab" mini>
        <NoteAdd/>
      </Button>
      <Button variant="fab" mini>
        <Search/>
      </Button>
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
