import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles, Toolbar, Typography, Tooltip, IconButton, CircularProgress, Fade } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { withLoadingNames } from '../../context/loading-names';
import { loadingNames } from '../../defaults';
import styles from './styles';

const ToolbarCmp = ({ classes, numSelected, deleteItems, selected, currentLoadingNames }) => {
  const loading = currentLoadingNames.includes(loadingNames.wordsList)

  return (
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
            Saved words
            <Fade
              in={loading}
              style={{ transitionDelay: loading ? '300ms' : '' }}
              unmountOnExit
            >
              <CircularProgress/>
            </Fade>
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
};

ToolbarCmp.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  currentLoadingNames: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line react/forbid-prop-types
  numSelected: PropTypes.number.isRequired,
  deleteItems: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ToolbarCmp.defaultProps = {
  currentLoadingNames: [],
};

const enhance = compose(
  withStyles(styles),
  withLoadingNames,
);

export default enhance(ToolbarCmp);
