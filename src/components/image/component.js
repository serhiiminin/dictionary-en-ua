import React from 'react';
import PropTypes from 'prop-types';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const Image = ({ src, width, height, classes }) => (
  <div className={`${classes.imageBlock} ${src}${width}${height}`} />
);

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  classes: composeClassesPropTypes(styles),
};

Image.defaultProps = {
  src: '',
  width: 300,
  height: 200,
  classes: {},
};

export default Image;
