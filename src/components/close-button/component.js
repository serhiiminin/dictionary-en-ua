import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';

const CloseButton = ({ classes, onClick }) => (
  <button
    type='button'
    className={classes.closeButton}
    onClick={e => { e.preventDefault(); onClick()}}
  >
    <CloseIcon/>
  </button>
);

CloseButton.propTypes = {
  classes: classesShape,
  onClick: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
  classes: classesDefaultProps,
};

export default CloseButton;
