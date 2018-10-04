import { Fade, LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { TextField } from '../../components-mui';

const TextFieldLoading = ({ classes, loading, ...restProps }) => (
  <div className={classes.textFieldLoading}>
    <TextField {...restProps} />
    <Fade in={loading}>
      <LinearProgress color='secondary' />
    </Fade>
  </div>
);

TextFieldLoading.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool,
};

TextFieldLoading.defaultProps = {
  loading: false,
  classes: {},
};

export default TextFieldLoading;
