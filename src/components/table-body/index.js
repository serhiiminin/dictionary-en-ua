import React from 'react';
import moment from 'moment';
import { Checkbox, TableBody, TableCell, TableRow } from '@material-ui/core';

const getSorting = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);

const TableBodyCmp = ({ words, order, orderBy, page, rowsPerPage, emptyRows, isSelected, handleClick }) => (
  <TableBody>
    {words
      .sort(getSorting(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(word => {
        const { en, ru, transcription, examples, date, _id } = word;
        const isSelectedCurrent = isSelected(_id);

        return (
          <TableRow
            hover
            onClick={event => handleClick(event, _id)}
            role="checkbox"
            aria-checked={isSelectedCurrent}
            tabIndex={-1}
            key={_id}
            selected={isSelectedCurrent}
          >
            <TableCell padding="checkbox">
              <Checkbox checked={isSelectedCurrent} />
            </TableCell>
            <TableCell component="th" scope="row">{ru || '-'}</TableCell>
            <TableCell>{en || '-'}</TableCell>
            <TableCell>{transcription || '-'}</TableCell>
            <TableCell>{examples ? examples[0] : '-'}</TableCell>
            <TableCell>{moment(date).isSame(moment(), 'day')
              ? `Today at ${moment(date).format('hh:mm:ss a') }`
              : moment(date).format('DD.MM.YY, hh:mm a') || '-'}</TableCell>
          </TableRow>
        );
      })}
    {emptyRows > 0 && (
      <TableRow style={{ height: 49 * emptyRows }}>
        <TableCell colSpan={6} />
      </TableRow>
    )}
  </TableBody>
);

export default TableBodyCmp
