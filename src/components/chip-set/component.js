import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import { Button } from '../../components-mui';

const ChipSet = ({ classes, items, blockTitle, onAddItem, onRemoveItem }) =>
  items.length > 0 && (
    <div className={classes.multipleInputs}>
      <h3 className={classes.blockTitle}>{blockTitle}</h3>
      {items.map(({ id, value }) => (
        <Chip
          key={id}
          label={value}
          icon={<TagFacesIcon/>}
          onDelete={() => onRemoveItem(id)}
        />
      ))}
      <Button
        onClick={onAddItem}
        title='Remove example'
        variant="fab"
        mini
      >
        <AddIcon/>
      </Button>
    </div>
  );

ChipSet.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  label: PropTypes.string,
  blockTitle: PropTypes.string,
  onAddItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

ChipSet.defaultProps = {
  classes: {},
  items: [],
  label: null,
  blockTitle: null,
};

export default ChipSet;
