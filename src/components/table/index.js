import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles, Table, Paper, TablePagination, LinearProgress, Fade, TableRow,
  TableCell, Checkbox, TableHead } from '@material-ui/core';
import { Toolbar, TableBody } from '..';
import { loadingNamesInitialState, withLoadingNames } from '../../context/loading-names';
import { withWords, wordsInitialState } from '../../context/words';
import { classesShape } from '../../defaults/shapes';
import { loadingNames } from '../../defaults';
import { wordsListShape } from '../../context/words/shape';
import styles from './styles';

class TableCmp extends Component {
  static propTypes = {
    classes: classesShape.isRequired,
    currentLoadingNames: PropTypes.arrayOf(PropTypes.string),
    words: wordsListShape,
    fetchWords: PropTypes.func.isRequired,
    deleteWord: PropTypes.func.isRequired,
    cleanWords: PropTypes.func.isRequired,
    screenWidth: PropTypes.number,
  };

  static defaultProps = {
    screenWidth: null,
    words: wordsInitialState,
    currentLoadingNames: loadingNamesInitialState,
  };

  state = {
    selected: [],
    order: 'desc',
    orderBy: 'dateCreated',
    rowsPerPage: 10,
    page: 0,
  };

  componentDidMount() {
    this.props.fetchWords();
  }

  componentWillUnmount() {
    this.props.cleanWords();
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(() => ({ selected: this.props.words.map(word => word._id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const isChecked = selected.includes(id);

    const newSelected = isChecked
      ? [...selected].filter(item => item !== id)
      : [...selected, id];

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event =>
    this.setState({ rowsPerPage: event.target.value });

  isSelected = id => this.state.selected.includes(id);

  handleDeleteItems = itemsIds => {
    const { fetchWords, deleteWord } = this.props;
    const fetchList = itemsIds.map(id => deleteWord(id));

    return Promise.all(fetchList)
      .then(() => fetchWords())
      .then(() => this.setState({ selected: [] }));
  };

  render() {
    const { classes, screenWidth, currentLoadingNames, words } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, words.length - page * rowsPerPage);
    const loading = currentLoadingNames.includes(loadingNames.wordsList);
    const numSelected = selected.length;
    const rowCount = words.length;

    return (
      <Paper className={classes.root}>
        <Toolbar
          numSelected={selected.length}
          deleteItems={this.handleDeleteItems}
          selected={selected}
        />
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={numSelected === rowCount && rowCount !== 0}
                  onChange={this.handleSelectAllClick}
                />
              </TableCell>
              <TableCell>English</TableCell>
              <TableCell>Russian</TableCell>
              <TableCell>Transcription</TableCell>
              <TableCell>Example</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        <Fade
          in={loading}
          style={{ transitionDelay: loading ? '300ms' : '' }}
        >
          <LinearProgress color='secondary'/>
        </Fade>
        <Table>
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
  withLoadingNames,
  withWords,
);

export default enhance(TableCmp);
