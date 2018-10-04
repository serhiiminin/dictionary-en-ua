import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { Button, TextField } from '../../components-mui';

const InputsBlock = ({ classes, children, title, onAddItem, controlled }) => (
  <div className={classes.inputsBlock}>
    <div className={classes.topLine}>
      <h3 className={classes.blockTitle}>{title}</h3>
      <div>
        {controlled && (
          <TextField
            placeholder='Add new option'
            value=''
            control={
              <Button
                onClick={onAddItem}
                title='Add new option'
                mini
              >
                <AddIcon/>
              </Button>
            }
          />
        )}
      </div>
    </div>
    <div className={classes.blockItems}>
      {children}
    </div>
  </div>
);

InputsBlock.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  controlled: PropTypes.bool,
  onAddItem: PropTypes.func.isRequired,
};

InputsBlock.defaultProps = {
  classes: {},
  title: null,
  controlled: false,
};

export default InputsBlock;
