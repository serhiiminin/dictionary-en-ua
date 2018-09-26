import React from 'react';
import PropTypes from 'prop-types';

const FoundImage = ({ classes, url }) => (
  <div
    className={classes.foundImage}
    style={{ background: `url(${url}) center / cover no-repeat` }}
  >
    {!url && <div className={classes.foundImageInner}>No image</div>}
  </div>
);

FoundImage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  url: PropTypes.string,
};

FoundImage.defaultProps = {
  classes: {},
  url: null,
};

export default FoundImage;
