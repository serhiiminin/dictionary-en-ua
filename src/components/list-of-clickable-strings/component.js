import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import { ClickableWord } from '..';

const ListOfClickableStrings = ({ items, onClick, delimiter }) => (
  <div>
    {items && items.map((item, index) =>
      <ClickableWord
        key={uuid()}
        onClick={onClick}
        word={item}
        delimiter={items.length - 1 > index ? delimiter : ''}
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
