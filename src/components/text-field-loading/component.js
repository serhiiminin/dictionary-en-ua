import { Fade, LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { TextField } from '../../components-mui';

const TextFieldLoading = ({ classes, loading = false, ...restProps }) => (
  <div className={classes.textFieldLoading}>
    <TextField {...restProps} />
    <Fade
      in={loading}
      style={{ transitionDelay: loading ? '300ms' : '' }}
    >
      <LinearProgress color='secondary' />
    </Fade>
  </div>
);

TextFieldLoading.propTypes = {
  classes: classesShape,
  loading: PropTypes.bool,
};

TextFieldLoading.defaultProps = {
  loading: false,
  classes: classesDefaultProps,
};

export default TextFieldLoading;
