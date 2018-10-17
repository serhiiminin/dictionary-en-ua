import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '../../components-mui';
import { SelectWithOptions } from '..';

const Toolbar = props => {
  const {
    classes,
    checkAllControl,
    sortBy,
    sortDirection,
    onChangeSortDirection,
    onChangeSortBy,
    isAnyChecked,
    children,
  } = props;

  return (
    <div className={classes.toolbar}>
      <div>{checkAllControl}</div>
      <div className={classes.toolbarButtons}>
        {isAnyChecked
          ? children
          : (
            <Fragment>
              <Button
                onClick={onChangeSortDirection}
                title='Sort direction'
                color='primary'
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
            </Fragment>
          )
        }
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
  isAnyChecked: PropTypes.bool,
};

Toolbar.defaultProps = {
  classes: {},
  checkAllControl: null,
  sortBy: null,
  sortDirection: null,
  isAnyChecked: null,
};

export default Toolbar;
