import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt, classes }) => (
  <div className={classes.imageWrapper}>
    {src
      ? (
        <img
          className={classes.image}
          src={src}
          alt={alt}
        />
      )
      : 'There is no image'}
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
