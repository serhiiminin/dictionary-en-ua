import React from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@material-ui/core';

const LinearProgressCustomized = ({ classes, ...restProps }) => (
  <LinearProgress
    classes={{
      root: classes.root,
    }}
    {...restProps}
  />
);

LinearProgressCustomized.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

LinearProgressCustomized.defaultProps = {
  classes: {},
};

export default LinearProgressCustomized;
