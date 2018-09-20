import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Button, TextField } from '../../components-mui';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';

const Pagination = ({ classes, pageNumber, maxPageCount, onChangePage }) => {
  const prevPage = Number(pageNumber) > 1 ? Number(pageNumber) - 1 : 1;
  const nextPage = Number(pageNumber) < maxPageCount ? Number(pageNumber) + 1 : maxPageCount;

  return (
    <div className={classes.pagination}>
      <Button
        onClick={() => onChangePage(prevPage)}
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
            let numberPage = value;

            if(value > maxPageCount) numberPage = maxPageCount;
            if(value < 1) numberPage = 1;
            return onChangePage(numberPage);
          }}
          value={pageNumber}
        />
      </div>
      <Button
        onClick={() => onChangePage(nextPage)}
        title='Next page'
        variant="fab"
        mini
      >
        <KeyboardArrowRight/>
      </Button>
    </div>
  );
};

Pagination.propTypes = {
  classes: classesShape,
  pageNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxPageCount: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  classes: classesDefaultProps,
  pageNumber: null,
  maxPageCount: null,
};

export default Pagination;
