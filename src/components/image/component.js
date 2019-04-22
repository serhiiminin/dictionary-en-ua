import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, width, height }) => <div className={`${src}${width}${height}`} />;

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

Image.defaultProps = {
  src: '',
  width: 300,
  height: 200,
};

export default Image;
