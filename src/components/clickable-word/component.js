import PropTypes from 'prop-types';
import React from 'react';
import { classesShape } from '../../defaults/shapes';

const ClickableWord = ({ word, delimiter, onClick, classes }) => (
  <a href="/"
     className={classes.clickableWord}
     onClick={event => {
       event.preventDefault();
       onClick(word);
     }}>
    {`${word}${delimiter}`}
  </a>
);

ClickableWord.propTypes = {
  word: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: classesShape,
  delimiter: PropTypes.string,
};

ClickableWord.defaultProps = {
  delimiter: '',
  classes: {},
};

export default ClickableWord
