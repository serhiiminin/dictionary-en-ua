import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, SelectWithOptions } from '../index';

const PaginationPanel = ({ classes, countPerPage, page, maxPageCount, onChangePage, onChangeCount }) => (
  <div className={classes.paginationPanel}>
    <SelectWithOptions
      onChange={onChangeCount}
      value={countPerPage}
      label='Words per page'
      options={[
        { key: 1, title: 1 },
        { key: 5, title: 5 },
        { key: 10, title: 10 },
        { key: 25, title: 25 },
        { key: 50, title: 50 },
        { key: 100, title: 100 },
      ]}
    />
    <Pagination
      pageNumber={page}
      maxPageCount={maxPageCount}
      onChangePage={onChangePage}
    />
  </div>
);

PaginationPanel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  countPerPage: PropTypes.number,
  page: PropTypes.number,
  maxPageCount: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  onChangeCount: PropTypes.func.isRequired,
};

PaginationPanel.defaultProps = {
  classes: {},
  countPerPage: null,
  page: null,
  maxPageCount: null,
};

export default PaginationPanel;
