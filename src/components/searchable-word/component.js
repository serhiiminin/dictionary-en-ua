import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../routes';

const SearchableWord = ({ word, classes }) => (
  <Link
    to={`${routes.words.search}?query=${word}`}
    className={classes.clickableWord}
  >
    {word}
  </Link>
);

SearchableWord.propTypes = {
  word: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

SearchableWord.defaultProps = {
  classes: {},
};

export default SearchableWord;
