import React from 'react';
import PropTypes from 'prop-types';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';

const FoundImage = ({ classes, url }) => (
  <div
    className={classes.foundImage}
    style={{ background: `url(${url}) center / cover no-repeat` }}
  >
    {!url && <div className={classes.foundImageInner}>No image</div>}
  </div>
);

FoundImage.propTypes = {
  classes: classesShape,
  url: PropTypes.string,
};

FoundImage.defaultProps = {
  classes: classesDefaultProps,
  url: null,
};

export default FoundImage;
