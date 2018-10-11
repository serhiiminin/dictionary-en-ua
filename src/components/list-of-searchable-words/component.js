import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { SearchableWord } from '..';

const ListOfSearchableWords = ({ items }) =>
  items && items.map((item, index) =>
    <React.Fragment>
      <SearchableWord
        key={uuid()}
        word={item}
      />{index < items.length - 1 && ', '}
    </React.Fragment>
  );

ListOfSearchableWords.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

ListOfSearchableWords.defaultProps = {
  items: [],
};

export default ListOfSearchableWords;
