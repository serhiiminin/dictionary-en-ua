import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { Button, TextField } from '../../components-mui';

const MultipleInputs = ({ classes, items, placeholder, onRemoveItem }) =>
  <div className={classes.multipleInputs}>
    {items.map(({id, value}) => (
    <TextField
      key={id}
      placeholder={placeholder}
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
  </div>;

MultipleInputs.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  placeholder: PropTypes.string,
  onRemoveItem: PropTypes.func.isRequired,
};

MultipleInputs.defaultProps = {
  classes: {},
  items: [],
  placeholder: null,
};

export default MultipleInputs;
