import React, { Fragment } from "react";
import PropTypes from "prop-types";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import styled from "styled-components";
import { Button } from "../../components-mui";
import { SelectWithOptions } from "..";

const ToolbarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 22fr 1fr;
  align-content: center;
  background: ${props => props.theme.main.colors.background};
  padding: 10px 10px;
`;

const ToolbarButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const Toolbar = props => {
  const {
    checkAllControl,
    sortBy,
    sortDirection,
    onChangeSortDirection,
    onChangeSortBy,
    isAnyChecked,
    children
  } = props;

  return (
    <ToolbarWrapper>
      <div>{checkAllControl}</div>
      <ToolbarButtonsWrapper>
        {isAnyChecked ? (
          children
        ) : (
          <Fragment>
            <Button
              onClick={onChangeSortDirection}
              title="Sort direction"
              color="primary"
              variant="raised"
              mini
            >
              {sortDirection === "descend" ? (
                <KeyboardArrowDown />
              ) : (
                <KeyboardArrowUp />
              )}
            </Button>
            <div>
              <SelectWithOptions
                value={sortBy}
                label="Sort by"
                onChange={onChangeSortBy}
                options={[
                  { key: "en", title: "English" },
                  { key: "ua", title: "Ukrainian" },
                  { key: "dateCreated", title: "Was added" },
                  { key: "timesLearnt", title: "Was learnt times" },
                  { key: "dateLastLearnt", title: "Was learnt last time" }
                ]}
              />
            </div>
          </Fragment>
        )}
      </ToolbarButtonsWrapper>
    </ToolbarWrapper>
  );
};

Toolbar.propTypes = {
  checkAllControl: PropTypes.node,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  onChangeSortDirection: PropTypes.func.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isAnyChecked: PropTypes.bool
};

Toolbar.defaultProps = {
  checkAllControl: null,
  sortBy: null,
  sortDirection: null,
  isAnyChecked: null
};

export default Toolbar;
