import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const TextFieldCustomized = ({ control, ...restProps }) => (
  <div>
    <TextField {...restProps} />
    {control}
  </div>
);

TextFieldCustomized.propTypes = {
  control: PropTypes.node,
};

TextFieldCustomized.defaultProps = {
  control: null,
};

export default TextFieldCustomized;
