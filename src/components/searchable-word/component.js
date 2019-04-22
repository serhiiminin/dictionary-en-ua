import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { joinUrl, mergeSearch } from 'url-joiner';
import routes from '../../routes';

const SearchableWord = ({ word, delimiter }) => (
  <>
    <Link to={joinUrl(routes.words.search, mergeSearch({ query: word }))}>{word}</Link>
    {delimiter}
  </>
);

SearchableWord.propTypes = {
  word: PropTypes.string.isRequired,
  delimiter: PropTypes.node,
};

SearchableWord.defaultProps = {
  delimiter: null,
};

export default SearchableWord;
