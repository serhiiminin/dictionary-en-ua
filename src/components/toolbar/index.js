import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles, Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import styles from './styles';

const ToolbarCmp = ({ classes, numSelected, deleteItems, selected }) => (
  <Toolbar
    className={classes.root}
  >
    <div className={classes.title}>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subheading">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="title" id="tableTitle">
          Nutrition
        </Typography>
      )}
    </div>
    <div className={classes.spacer}/>
    <div className={classes.actions}>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete"
            onClick={() => deleteItems(selected)}
          >
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton
            aria-label="Filter list"
          >
            <FilterListIcon/>
          </IconButton>
        </Tooltip>
      )}
    </div>
  </Toolbar>
);

ToolbarCmp.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

const enhance = compose(
  withStyles(styles),
);

export default enhance(ToolbarCmp);
