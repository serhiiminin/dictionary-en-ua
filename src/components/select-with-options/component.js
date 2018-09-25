import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '../../components-mui';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';

const SelectWithOptions = ({ classes, label, value, onChange, options }) => (
  <Select
    label={label}
    value={value}
    onChange={onChange}
    className={classes.selectWithOptions}
  >
    {options.map(({ key, title }) => (
      <MenuItem value={key} key={key}>{title}</MenuItem>
    ))}
  </Select>
);

SelectWithOptions.propTypes = {
  classes: classesShape,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
};

SelectWithOptions.defaultProps = {
  classes: classesDefaultProps,
  options: [],
  value: null,
  label: null,
};

export default SelectWithOptions;
