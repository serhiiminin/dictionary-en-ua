import { Fade, LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from '../../components-mui';

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
