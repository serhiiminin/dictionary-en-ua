import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, classes }) => (
  <div className={classes.imageWrapper}>
    <img
      className={classes.image}
      src={src}
      alt={alt}
    />
  </div>
);

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
};

Image.defaultProps = {
  src: '',
  alt: '',
  classes: {},
};

export default Image;
