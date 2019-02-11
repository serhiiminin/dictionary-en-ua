import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const ChipSet = ({ items, onRemoveItem, disabled, classes }) => (
  <div className={classes.chipSet}>
    {items.map(({ id, value }) => (
      <Chip
        classes={{ root: classes.chip }}
        key={id}
        label={value}
        icon={<TagFacesIcon />}
        onDelete={() => onRemoveItem(id)}
        disabled={disabled}
      />
    ))}
  </div>
);

ChipSet.propTypes = {
  classes: composeClassesPropTypes(styles),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  onRemoveItem: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ChipSet.defaultProps = {
  classes: {},
  items: [],
  disabled: false,
};

export default ChipSet;
