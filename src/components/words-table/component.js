import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Checkbox, Fade } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import loadingNames from '../../constants/loading-names';
import { parseSearchParams, joinRoute } from '../../helpers/search-params';
import { LinearProgress } from '../../components-mui';
import { PaginationPanel, Toolbar, WordsList, ButtonControl } from '..';

class WordsTable extends Component {
  static propTypes = {
    wordsList: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
      })),
    classes: PropTypes.objectOf(PropTypes.string),
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    wordsCount: PropTypes.number,
    deleteWord: PropTypes.func.isRequired,
    getWordsSearchParams: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
  };

  static defaultProps = {
    classes: {},
    wordsList: null,
    wordsCount: null,
  };

  state = {
    checked: [],
  };

  handleOnCheck = id => this.setState(prevState => ({
    checked: prevState.checked.find(wordId => wordId === id)
      ? prevState.checked.filter(wordId => wordId !== id)
      : [...prevState.checked, id]
  }));

  handleOnCheckAll = () => this.setState(prevState => ({
    checked: prevState.checked.length !== this.props.wordsList.length
      ? [...this.props.wordsList.map(word => word._id)]
      : []
  }));

  handleDeleteWord = () => this.state.checked.length > 0 &&
    Promise.resolve(this.state.checked.map(id => this.props.deleteWord(id)))
      .then(() => this.setState({ checked: [] }));

  generateUrl = params => {
    const { location } = this.props;

    return joinRoute(
      location.pathname,
      location.search,
      [],
      params,
    );
  };

  handleOnChangeSelect = (event, field) =>
    this.props.history.push(this.generateUrl({ page: 1, [field]: event.target.value }));

  handleOnChangeDirection = () => {
    const { location, history } = this.props;

    return history.push(this.generateUrl(
      { sortDirection: parseSearchParams(location.search).sortDirection === 'descend' ? 'ascend' : 'descend' },
    ));
  };

  handleOnChangePage = pageNumber =>
    this.props.history.push(this.generateUrl({ page: pageNumber }));

  render() {
    const { checked } = this.state;
    const { classes, wordsList, wordsCount, checkIsLoading, getWordsSearchParams, location } = this.props;
    const { countPerPage, sortBy, sortDirection, page } = getWordsSearchParams(location);
    const loading = checkIsLoading(loadingNames.wordsList);
    const isCheckedAll = checked.length === wordsList.length && checked.length > 0;

    return (
      <main>
        <div className={classes.wordsList}>
          <Toolbar
            checkAllControl={<Checkbox onChange={this.handleOnCheckAll} checked={isCheckedAll}/>}
            isAnyChecked={checked.length > 0}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onChangeSortDirection={this.handleOnChangeDirection}
            onChangeSortBy={event => this.handleOnChangeSelect(event, 'sortBy')}
          >
            <ButtonControl
              disabled={checked.length === 0}
              color='primary'
              title='Delete'
            >
              <Delete onClick={this.handleDeleteWord}/>
            </ButtonControl>
          </Toolbar>
          <Fade in={loading}>
            <LinearProgress color='secondary' variant='query'/>
          </Fade>
          <WordsList
            wordsList={wordsList}
            onWordCheck={this.handleOnCheck}
            loading={loading}
            countPerPage={countPerPage}
            checked={checked}
          />
          <PaginationPanel
            countPerPage={countPerPage}
            page={page}
            maxPageCount={Math.ceil(wordsCount / countPerPage)}
            onChangeCount={event => this.handleOnChangeSelect(event, 'countPerPage')}
            onChangePage={this.handleOnChangePage}
          />
        </div>
      </main>
    );
  }
}

export default WordsTable;
