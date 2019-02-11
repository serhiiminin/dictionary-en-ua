import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { ButtonControl, TextField } from '..';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const MultipleInputs = ({
  classes,
  items,
  placeholder,
  onRemoveItem,
  onChange,
  disabled,
}) => (
  <div className={classes.multipleInputs}>
    {items.map(({ id, value }) => (
      <TextField
        onChange={event => onChange(id, event.target.value)}
        key={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        control={
          <ButtonControl
            color="primary"
            onClick={() => onRemoveItem(id)}
            title="Remove example"
            disabled={disabled}
          >
            <DeleteIcon />
          </ButtonControl>
        }
      />
    ))}
  </div>
);

MultipleInputs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  onRemoveItem: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  classes: composeClassesPropTypes(styles),
};

MultipleInputs.defaultProps = {
  items: [],
  placeholder: null,
  disabled: false,
  classes: {},
};

export default MultipleInputs;
