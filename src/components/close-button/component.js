import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';

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
  classes: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
  classes: {},
};

export default CloseButton;
