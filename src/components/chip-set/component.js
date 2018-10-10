import React from 'react';
import PropTypes from 'prop-types';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { Chip } from '../../components-mui';

const ChipSet = ({ classes, items, onRemoveItem }) => (
  <div className={classes.chipSet}>
    {items.map(({ id, value }) => (
      <Chip
        className={classes.chip}
        key={id}
        label={value}
        icon={<TagFacesIcon/>}
        onDelete={() => onRemoveItem(id)}
      />
    ))}
  </div>
);

ChipSet.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  onRemoveItem: PropTypes.func.isRequired,
};

ChipSet.defaultProps = {
  classes: {},
  items: [],
};

export default ChipSet;
