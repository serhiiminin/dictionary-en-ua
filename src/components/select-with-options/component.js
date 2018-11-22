import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from "@material-ui/core";
import { Select } from '..';
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';

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
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  classes: composeClassesPropTypes(styles),
};

SelectWithOptions.defaultProps = {
  options: [],
  value: "",
  label: null,
  classes: {},
};

export default SelectWithOptions;
