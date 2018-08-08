import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField } from '@material-ui/core';
import { compose } from 'recompose';
import styles from './styles';

const TextFieldCustomized = ({ classes, control, ...restProps }) => (
  <div>
    <TextField
      {...restProps}
      classes={{
        root: classes.root,
      }}
      InputProps={{
        classes: {
          underline: classes.underline,
        },
      }}
      InputLabelProps={{
        className: classes.label,
      }}
    />
    {control}
  </div>

);

TextFieldCustomized.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  control: PropTypes.node,
};

TextFieldCustomized.defaultProps = {
  control: null,
};

const enhance = compose(
  withStyles(styles),
);

export default enhance(TextFieldCustomized);
