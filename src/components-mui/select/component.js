import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const SelectCustomized = ({ children, label, classes, ...restProps }) => (
  <FormControl className={classes.selectWrapper}>
    {label && <InputLabel htmlFor={label}>{label}</InputLabel>}
    <Select
      {...restProps}
      classes={{
        root: classes.root,
        select: classes.select,
        selectMenu: classes.selectMenu,
      }}
    >
      {children}
    </Select>
  </FormControl>
);

SelectCustomized.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  label: PropTypes.string,
};

SelectCustomized.defaultProps = {
  classes: {},
  label: null,
};

export default SelectCustomized;
