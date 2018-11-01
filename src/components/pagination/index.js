import React from "react";
import PropTypes from "prop-types";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import styled from "styled-components";
import { TextField } from "../../components-mui";
import { ButtonControl } from "..";

const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const PaginationInput = styled.div`
  width: 100px;
`;

const Pagination = ({ pageNumber, maxPageCount, onChangePage }) => {
  const prevPage = Number(pageNumber) > 1 ? Number(pageNumber) - 1 : 1;
  const nextPage =
    Number(pageNumber) < maxPageCount ? Number(pageNumber) + 1 : maxPageCount;

  return (
    <Page>
      <ButtonControl
        onClick={() => onChangePage(prevPage)}
        disabled={pageNumber === 1}
        color="primary"
        title="Previous page"
      >
        <KeyboardArrowLeft />
      </ButtonControl>
      <PaginationInput>
        <TextField
          label={
            maxPageCount
              ? `Page ${pageNumber} of ${maxPageCount}`
              : "Page number"
          }
          onChange={event => {
            const { value } = event.target;
            let numberPage = parseInt(value, 10);

            if (value > maxPageCount) numberPage = maxPageCount;
            if (value < 1) numberPage = 1;
            return onChangePage(numberPage);
          }}
          value={pageNumber}
        />
      </PaginationInput>
      <ButtonControl
        onClick={() => onChangePage(nextPage)}
        disabled={maxPageCount === pageNumber}
        title="Next page"
        color="primary"
      >
        <KeyboardArrowRight />
      </ButtonControl>
    </Page>
  );
};

Pagination.propTypes = {
  pageNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxPageCount: PropTypes.number,
  onChangePage: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  pageNumber: null,
  maxPageCount: null
};

export default Pagination;
