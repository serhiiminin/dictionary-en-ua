import React from 'react';
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

export default TableHeadCmp;
