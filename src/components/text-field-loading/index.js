import { Fade, LinearProgress, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const TextFieldLoading = ({ loading, ...restProps }) => (
  <div>
    <TextField {...restProps} />
    <Fade in={loading}>
      <LinearProgress color='secondary' />
    </Fade>
  </div>
);

TextFieldLoading.propTypes = {
  loading: PropTypes.bool,
};

TextFieldLoading.defaultProps = {
  loading: false,
};

export default TextFieldLoading;
