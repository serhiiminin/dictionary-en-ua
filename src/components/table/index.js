import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles, Table, Paper, TablePagination } from '@material-ui/core';
import { Toolbar, TableHead, TableBody } from '..';
import { withWords } from '../../context/words';
import styles from './styles';

class TableCmp extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    fetchWords: PropTypes.func.isRequired,
    deleteWord: PropTypes.func.isRequired,
    screenWidth: PropTypes.number,
  };

  static defaultProps = {
    screenWidth: null,
  };

  state = {
    words: [],
    selected: [],
    order: 'desc',
    orderBy: 'dateCreated',
    rowsPerPage: 10,
    page: 0,
  };

  componentDidMount() {
    this.props.fetchWords();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.words.length !== prevState.words.length) {
      return { words: nextProps.words, };
    }
    return null;
  }

  handleRequestSort = (event, property) => {
    const currentOrderBy = property;
    const { orderBy, order } = this.state;
    let currentOrder = 'desc';

    if (orderBy === property && order === 'desc') {
      currentOrder = 'asc';
    }
    this.setState({ order: currentOrder, orderBy: currentOrderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.words.map(n => n._id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleDeleteItems = itemsIds => {
    const { fetchWords, deleteWord } = this.props;
    const fetchList = itemsIds.map(id => deleteWord(id));

    return Promise.all(fetchList)
      .then(() => fetchWords())
      .then(() => this.setState({ selected: [] }));
  };

  render() {
    const { classes, screenWidth } = this.props;
    const { words, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, words.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <Toolbar
          numSelected={selected.length}
          deleteItems={this.handleDeleteItems}
          selected={selected}
        />
        <Table className={classes.table}>
          <TableHead
            screenWidth={screenWidth}
            cells={['Russian', 'English', 'Transcription', 'Example', 'Date']}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={this.handleSelectAllClick}
            onRequestSort={this.handleRequestSort}
            rowCount={words.length}
          />
          <TableBody
            screenWidth={screenWidth}
            words={words}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
            isSelected={this.isSelected}
            handleClick={this.handleClick}
          />
        </Table>
        <TablePagination
          component="div"
          count={words.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{ 'aria-label': 'Previous Page' }}
          nextIconButtonProps={{ 'aria-label': 'Next Page' }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const enhance = compose(
  withStyles(styles),
  withWords,
);

export default enhance(TableCmp);
