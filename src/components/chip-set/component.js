import React from 'react';
import PropTypes from 'prop-types';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { Chip } from '../../components-mui';

const ChipSet = ({ classes, items, onRemoveItem, disabled }) => (
  <div className={classes.chipSet}>
    {items.map(({ id, value }) => (
      <Chip
        className={classes.chip}
        key={id}
        label={value}
        icon={<TagFacesIcon/>}
        onDelete={() => onRemoveItem(id)}
        disabled={disabled}
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
  disabled: PropTypes.bool,
};

ChipSet.defaultProps = {
  classes: {},
  items: [],
  disabled: false,
};

export default ChipSet;
