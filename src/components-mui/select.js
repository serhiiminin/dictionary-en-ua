import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select } from "@material-ui/core";
import styled from "styled-components";

const CustomizedFormControl = styled(FormControl)`
  && {
    width: 100%;
  }
`;

const CustomizedSelect = styled(props => (
  <Select
    {...props}
    classes={{
      select: "select"
    }}
  />
))`
  && {
    width: 100%;
  }
  & .select {
    background: transparent !important;
  }
`;

const SelectCustomized = ({ children, label, ...restProps }) => (
  <CustomizedFormControl>
    {label && <InputLabel htmlFor={label}>{label}</InputLabel>}
    <CustomizedSelect
      {...restProps}
    >
      {children}
    </CustomizedSelect>
  </CustomizedFormControl>
);

SelectCustomized.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string
};

SelectCustomized.defaultProps = {
  label: null
};

export default SelectCustomized;
