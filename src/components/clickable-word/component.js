import React from 'react';
import PropTypes from 'prop-types';

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
  classes: PropTypes.objectOf(PropTypes.string),
  delimiter: PropTypes.string,
};

ClickableWord.defaultProps = {
  delimiter: '',
  classes: {},
};

export default ClickableWord
