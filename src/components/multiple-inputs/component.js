import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../../components-mui';

const MultipleInputs = ({ classes, items, label, blockTitle }) =>
  items.length > 0 && (
    <div className={classes.multipleInputs}>
      <h3 className={classes.blockTitle}>{blockTitle}</h3>
      {items.map(({ id, value }) => (
        <TextField
          key={id}
          label={label}
          value={value}
        />
      ))}
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
};

MultipleInputs.defaultProps = {
  classes: {},
  items: [],
  label: null,
  blockTitle: null,
};

export default MultipleInputs;
