import React from 'react';
import PropTypes from 'prop-types';
import { Button, List, ListItem, Zoom } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { SelectWithOptions } from '..';

const Toolbar = ({
  checkAllControl,
  sortBy,
  sortDirection,
  onChangeSortDirection,
  onChangeSortBy,
  isAnyChecked,
  children,
}) => (
  <List>
    <ListItem divider>
      <div>{checkAllControl}</div>
      <div>
        {isAnyChecked ? (
          <Zoom in={isAnyChecked}>{children}</Zoom>
        ) : (
          <>
            <Button onClick={onChangeSortDirection} title="Sort direction" color="primary" variant="contained" mini>
              {sortDirection === 'descend' ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
            </Button>
            <div>
              <SelectWithOptions
                value={sortBy}
                label="Sort by"
                onChange={onChangeSortBy}
                options={[
                  { key: 'word', title: 'Word' },
                  { key: 'dateCreated', title: 'Was added' },
                  { key: 'timesLearnt', title: 'Was learnt times' },
                  { key: 'dateLastLearnt', title: 'Was learnt last time' },
                ]}
              />
            </div>
          </>
        )}
      </div>
    </ListItem>
  </List>
);

Toolbar.propTypes = {
  checkAllControl: PropTypes.node,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  onChangeSortDirection: PropTypes.func.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isAnyChecked: PropTypes.bool,
};

Toolbar.defaultProps = {
  checkAllControl: null,
  sortBy: 'dateCreated',
  sortDirection: 'ascend',
  isAnyChecked: false,
};

export default Toolbar;
