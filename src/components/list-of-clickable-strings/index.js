import React from 'react';
import PropTypes from 'prop-types';
import { ClickableString } from '..';

const ListOfClickableStrings = ({ items, onClick, delimiter = '' }) => (
  <div>
    {items && items.map(item =>
      <ClickableString
        key={item}
        onClick={event => { event.preventDefault(); onClick(item)}}
        delimiter={delimiter}
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
