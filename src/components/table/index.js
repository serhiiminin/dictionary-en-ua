import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withStyles, Table, Paper, TablePagination, LinearProgress, Fade } from '@material-ui/core';
import { Toolbar, TableBody, TableHead } from '..';
import { loadingNamesInitialState, withLoadingNames } from '../../context/loading-names';
import { withWords, wordsInitialState } from '../../context/words';
import { classesDefaultProps } from '../../defaults/default-props';
import { classesShape } from '../../defaults/shapes';
import { loadingNames } from '../../defaults';
import { wordsListShape } from '../../context/words/shape';
import styles from './styles';

class TableCmp extends Component {
  static propTypes = {
    classes: classesShape,
    currentLoadingNames: PropTypes.arrayOf(PropTypes.string),
    words: wordsListShape,
    fetchWords: PropTypes.func.isRequired,
    deleteWord: PropTypes.func.isRequired,
    cleanWords: PropTypes.func.isRequired,
  };

  static defaultProps = {
    words: wordsInitialState,
    currentLoadingNames: loadingNamesInitialState,
    classes: classesDefaultProps,
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

  handleSelectAllClick = (event, checked) =>
    this.setState({
      selected: checked
        ? this.props.words.map(word => word._id)
        : []
    });

  handleClick = (event, id) => {
    const { selected } = this.state;
    const isChecked = selected.includes(id);

    const newSelected = isChecked
      ? [...selected].filter(item => item !== id)
      : [...selected, id];

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) =>
    this.setState({ page });

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
    const { classes, currentLoadingNames, words } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, words.length - page * rowsPerPage);
    const loading = currentLoadingNames.includes(loadingNames.wordsList);
    const numSelected = selected.length;
    const wordsCount = words.length;

    return (
      <Paper className={classes.root}>
        <Fade
          in={loading}
          style={{ transitionDelay: loading ? '300ms' : '' }}
        >
          <LinearProgress color='secondary'/>
        </Fade>
        <Toolbar
          numSelected={numSelected}
          deleteItems={this.handleDeleteItems}
          selected={selected}
        />
        <Table className={classes.table}>
          <TableHead
            onSelectAllClick={this.handleSelectAllClick}
            rowCount={wordsCount}
            numSelected={numSelected}
          />
          <TableBody
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
          count={wordsCount}
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
