import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, Checkbox } from '@material-ui/core';

const TableHeadCmp = ({ numSelected, rowCount, onSelectAllClick }) => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount && rowCount !== 0}
          onChange={onSelectAllClick}
        />
      </TableCell>
      <TableCell>English</TableCell>
      <TableCell>Russian</TableCell>
      <TableCell>Transcription</TableCell>
      <TableCell>Date</TableCell>
    </TableRow>
  </TableHead>
);

TableHeadCmp.propTypes = {
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
};

export default TableHeadCmp;
