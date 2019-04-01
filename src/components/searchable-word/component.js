import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { joinUrl, mergeSearch } from 'url-joiner';
import routes from '../../routes';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const SearchableWord = ({ word, classes, delimiter }) => (
  <>
    <Link className={classes.clickableWord} to={joinUrl(routes.words.search, mergeSearch({ query: word }))}>
      {word}
    </Link>
    {delimiter}
  </>
);

SearchableWord.propTypes = {
  word: PropTypes.string.isRequired,
  delimiter: PropTypes.node,
  classes: composeClassesPropTypes(styles),
};

SearchableWord.defaultProps = {
  delimiter: null,
  classes: {},
};

export default SearchableWord;
