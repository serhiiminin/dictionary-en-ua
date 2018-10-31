import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { TextField } from '../../components-mui';
import { ButtonControl } from '..';

const MultipleInputs = ({ classes, items, placeholder, onRemoveItem, onChange, disabled }) =>
  <div className={classes.multipleInputs}>
    {items.map(({id, value}) => (
    <TextField
      onChange={event => onChange(id, event.target.value)}
      key={id}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      control={
        <ButtonControl
          color='primary'
          onClick={() => onRemoveItem(id)}
          title='Remove example'
          disabled={disabled}
        >
          <DeleteIcon/>
        </ButtonControl>
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
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

MultipleInputs.defaultProps = {
  classes: {},
  items: [],
  placeholder: null,
  disabled: false,
};

export default MultipleInputs;
