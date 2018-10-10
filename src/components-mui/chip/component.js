import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';

const ChipCustomized = ({ classes, ...restProps }) => (
  <Chip
    classes={{
      root: classes.root,
    }}
    {...restProps}
  />
);

ChipCustomized.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
};

ChipCustomized.defaultProps = {
  classes: {},
};

export default ChipCustomized;
