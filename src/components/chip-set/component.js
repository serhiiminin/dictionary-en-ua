import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import TagFacesIcon from '@material-ui/icons/TagFaces';

const ChipSet = ({ items, onRemoveItem }) =>
  items.map(({ id, value }) => (
    <Chip
      key={id}
      label={value}
      icon={<TagFacesIcon/>}
      onDelete={() => onRemoveItem(id)}
    />
  ));

ChipSet.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  onRemoveItem: PropTypes.func.isRequired,
};

ChipSet.defaultProps = {
  items: [],
};

export default ChipSet;
