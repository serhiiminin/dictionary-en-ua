import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Button, TextField } from '../../components-mui';

const Pagination = ({ classes, pageNumber, maxPageCount, onChangePage }) => {
  const prevPage = Number(pageNumber) > 1 ? Number(pageNumber) - 1 : 1;
  const nextPage = Number(pageNumber) < maxPageCount ? Number(pageNumber) + 1 : maxPageCount;

  return (
    <div className={classes.page}>
      <Button
        onClick={() => onChangePage(prevPage)}
        disabled={pageNumber === 1}
        color='primary'
        title='Previous page'
        variant="fab"
        mini
      >
        <KeyboardArrowLeft/>
      </Button>
      <div className={classes.paginationInput}>
        <TextField
          label={maxPageCount ? `Page ${pageNumber} of ${maxPageCount}` : 'Page number'}
          onChange={event => {
            const { value } = event.target;
            let numberPage = parseInt(value, 10);

            if(value > maxPageCount) numberPage = maxPageCount;
            if(value < 1) numberPage = 1;
            return onChangePage(numberPage);
          }}
          value={pageNumber}
        />
      </div>
      <Button
        onClick={() => onChangePage(nextPage)}
        disabled={maxPageCount === pageNumber}
        title='Next page'
        color='primary'
        variant="fab"
        mini
      >
        <KeyboardArrowRight/>
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  pageNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxPageCount: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  classes: {},
  pageNumber: null,
  maxPageCount: null,
};

export default Pagination;
