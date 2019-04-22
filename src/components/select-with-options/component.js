import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';
import { Select } from '..';

const SelectWithOptions = ({ label, value, onChange, options }) => (
  <Select label={label} value={value} onChange={onChange}>
    {options.length === 0 ? (
      <MenuItem value="" disabled>
        There are no appropriate options
      </MenuItem>
    ) : (
      options.map(({ key, title }) => (
        <MenuItem value={key} key={key}>
          {title}
        </MenuItem>
      ))
    )}
  </Select>
);

SelectWithOptions.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
};

SelectWithOptions.defaultProps = {
  options: [],
  value: '',
  label: null,
};

export default SelectWithOptions;
