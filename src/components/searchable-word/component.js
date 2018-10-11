import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../routes';

const SearchableWord = ({ word, classes, delimiter }) => (
  <React.Fragment>
    <Link
      to={`${routes.words.search}?query=${word}`}
      className={classes.clickableWord}
    >
      {word}
    </Link>
    {delimiter}
  </React.Fragment>
);

SearchableWord.propTypes = {
  word: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  delimiter: PropTypes.node,
};

SearchableWord.defaultProps = {
  classes: {},
  delimiter: null,
};

export default SearchableWord;
