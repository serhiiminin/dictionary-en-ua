import React from 'react';
import { MenuItem } from '@material-ui/core';

const MenuItemCustomized = ({ classes, ...restProps }) => (
  <MenuItem
    {...restProps}
    classes={{
      root: classes.root,
      selected: classes.selected,
    }}
  />
);

export default MenuItemCustomized;
