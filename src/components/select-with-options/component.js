import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Select } from '../../components-mui';

const SelectWithOptions = ({ classes, label, value, onChange, options }) => (
  <Select
    label={label}
    value={value}
    onChange={onChange}
    className={classes.selectWithOptions}
  >
    {options.length === 0
      ? <MenuItem value='' disabled>There are no appropriate options</MenuItem>
      : options.map(({ key, title }) => (
        <MenuItem value={key} key={key}>{title}</MenuItem>
      ))}
  </Select>
);

SelectWithOptions.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
};

SelectWithOptions.defaultProps = {
  classes: {},
  options: [],
  value: null,
  label: null,
};

export default SelectWithOptions;
