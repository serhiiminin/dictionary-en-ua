import React from 'react';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import { Button } from '../../components-mui';
import { SelectWithOptions } from '../index';

const Toolbar = props => {
  const { classes, checkAllControl, sortBy, sortDirection, onChangeSortDirection, onChangeSortBy, children } = props;

  return (
    <div className={classes.toolbar}>
      <div>{checkAllControl}</div>
      <div className={classes.toolbarButtons}>
        <Button
          onClick={onChangeSortDirection}
          title='Sort direction'
          variant="raised"
          mini
        >
          {sortDirection === 'descend' ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}
        </Button>
        <div className={classes.countPerPage}>
          <SelectWithOptions
            value={sortBy}
            label='Sort by'
            onChange={onChangeSortBy}
            options={[
              { key: 'en', title: 'English' },
              { key: 'ua', title: 'Ukrainian' },
              { key: 'dateCreated', title: 'Was added' },
              { key: 'timesLearnt', title: 'Was learnt times' },
              { key: 'dateLastLearnt', title: 'Was learnt last time' },
            ]}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  checkAllControl: PropTypes.node,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  onChangeSortDirection: PropTypes.func.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Toolbar.defaultProps = {
  classes: {},
  checkAllControl: null,
  sortBy: null,
  sortDirection: null,
};

export default Toolbar;
