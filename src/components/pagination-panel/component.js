import React from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "@material-ui/core";
import { Pagination, SelectWithOptions } from "..";
import composeClassesPropTypes from "../../modules/compose-classes-prop-types";
import styles from "./styles";

const PaginationPanel = ({ countPerPage, page, maxPageCount, onChangePage, onChangeCount, classes }) => (
  <List>
    <ListItem>
      <div className={classes.paginationPanel}>
        <SelectWithOptions
          onChange={onChangeCount}
          value={countPerPage}
          label="Words per page"
          options={[
            { key: 1, title: 1 },
            { key: 5, title: 5 },
            { key: 10, title: 10 },
            { key: 25, title: 25 },
            { key: 50, title: 50 },
            { key: 100, title: 100 }
          ]}
        />
        <Pagination pageNumber={page} maxPageCount={maxPageCount} onChangePage={onChangePage} />
      </div>
    </ListItem>
  </List>
);

PaginationPanel.propTypes = {
  classes: composeClassesPropTypes(styles),
  countPerPage: PropTypes.number,
  page: PropTypes.number,
  maxPageCount: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  onChangeCount: PropTypes.func.isRequired
};

PaginationPanel.defaultProps = {
  countPerPage: 5,
  page: 1,
  maxPageCount: 0,
  classes: {}
};

export default PaginationPanel;
