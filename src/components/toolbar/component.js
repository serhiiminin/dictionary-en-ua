import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import { SelectWithOptions, Button } from "..";
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';

const Toolbar = ({
  checkAllControl,
  sortBy,
  sortDirection,
  onChangeSortDirection,
  onChangeSortBy,
  isAnyChecked,
  children,
  classes,
}) => (
  <List>
    <ListItem divider>
      <div>{checkAllControl}</div>
      <div className={classes.toolbarWrapper}>
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
      </div>
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
  isAnyChecked: PropTypes.bool,
  classes: composeClassesPropTypes(styles),
};

Toolbar.defaultProps = {
  checkAllControl: null,
  sortBy: 'dateCreated',
  sortDirection: 'ascend',
  isAnyChecked: false,
  classes: {},
};

export default Toolbar;
