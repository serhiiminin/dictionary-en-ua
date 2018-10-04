import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { Button, TextField } from '../../components-mui';

const MultipleInputs = ({ classes, items, label, blockTitle, onAddItem, onRemoveItem }) =>
  items.length > 0 && (
    <div className={classes.multipleInputs}>
      <h3 className={classes.blockTitle}>{blockTitle}</h3>
      {items.map(({ id, value }) => (
        <TextField
          key={id}
          placeholder={label}
          value={value}
          control={
            <Button
              onClick={() => onRemoveItem(id)}
              title='Remove example'
              variant="fab"
              mini
            >
              <DeleteIcon/>
            </Button>
          }
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

MultipleInputs.propTypes = {
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

MultipleInputs.defaultProps = {
  classes: {},
  items: [],
  label: null,
  blockTitle: null,
};

export default MultipleInputs;
