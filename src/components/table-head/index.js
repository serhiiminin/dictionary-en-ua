import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, Checkbox } from '@material-ui/core';

const TableHeadCmp = ({ cells, numSelected, rowCount, onSelectAllClick }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
      {cells.map(cell => (
        <TableCell key={cell}>{cell}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);

TableHeadCmp.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.string),
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
};

TableHeadCmp.defaultProps = {
  cells: [],
};

export default TableHeadCmp;
