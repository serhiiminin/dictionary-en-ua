import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import styled from "styled-components";
import { SelectWithOptions, Button } from "..";

export const ToolbarButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, auto));
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Toolbar = ({
  checkAllControl,
  sortBy,
  sortDirection,
  onChangeSortDirection,
  onChangeSortBy,
  isAnyChecked,
  children
}) => (
  <List>
    <ListItem divider>
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
              variant="contained"
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
  isAnyChecked: PropTypes.bool
};

Toolbar.defaultProps = {
  checkAllControl: null,
  sortBy: 'dateCreated',
  sortDirection: 'ascend',
  isAnyChecked: false
};

export default Toolbar;
