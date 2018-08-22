import React from 'react';
import PropTypes from 'prop-types';
import { ClickableWord } from '../index';

const ListOfClickableStrings = ({ items, onClick, delimiter }) => (
  <div>
    {items && items.map((item, key) =>
      <ClickableWord
        key={item}
        onClick={onClick}
        word={item}
        delimiter={items.length-1 > key ? delimiter : ''}
      />
    )}
  </div>
);

ListOfClickableStrings.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func.isRequired,
  delimiter: PropTypes.string,
};

ListOfClickableStrings.defaultProps = {
  items: [],
  delimiter: '',
};

export default ListOfClickableStrings;
