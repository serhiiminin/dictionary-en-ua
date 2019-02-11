import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select } from '@material-ui/core';

const SelectBlock = ({ label, ...restProps }) => (
  <FormControl color="primary">
    {label && <InputLabel htmlFor={label}>{label}</InputLabel>}
    <Select {...restProps} />
  </FormControl>
);

SelectBlock.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
};

SelectBlock.defaultProps = {
  label: null,
};

export default SelectBlock;
