import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { classesShape } from '../../defaults/shapes';
import styles from './styles';

const ClicableString = ({ onClick, item, classes, delimiter }) => (
  <a
    href="/"
    key={item}
    className={classes.clickableWord}
    onClick={event => { event.preventDefault(); onClick(item)}}
  >
    {`${item}${delimiter}`}
  </a>
);

ClicableString.propTypes = {
  onClick: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired,
  classes: classesShape.isRequired,
  delimiter: PropTypes.string,
};

ClicableString.defaultProps = {
  delimiter: '',
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(ClicableString);
