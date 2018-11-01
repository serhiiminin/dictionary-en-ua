import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MenuItem, Select } from "../../components-mui";

const CustomizedSelect = styled(props => <Select {...props} />)`
  min-width: 130px;
  width: 100%;
`;

const SelectWithOptions = ({ label, value, onChange, options }) => (
  <CustomizedSelect label={label} value={value} onChange={onChange}>
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
  </CustomizedSelect>
);

SelectWithOptions.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired
};

SelectWithOptions.defaultProps = {
  options: [],
  value: null,
  label: null
};

export default SelectWithOptions;
