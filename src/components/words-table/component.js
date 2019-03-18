import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Checkbox } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import { parseSearchParams, joinRoute } from 'url-joiner';
import loadingNames from '../../constants/loading-names';
import { PaginationPanel, Toolbar, WordsList, ButtonControl } from '..';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

class WordsTable extends Component {
  static propTypes = {
    wordsList: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
      })
    ),
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    wordsCount: PropTypes.number,
    deleteWord: PropTypes.func.isRequired,
    getWordsSearchParams: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  static defaultProps = {
    wordsList: null,
    wordsCount: 0,
    classes: {},
  };

  state = {
    checked: [],
  };

  handleOnCheck = id =>
    this.setState(prevState => ({
      checked: prevState.checked.find(wordId => wordId === id)
        ? prevState.checked.filter(wordId => wordId !== id)
        : [...prevState.checked, id],
    }));

  handleOnCheckAll = () => {
    const { wordsList } = this.props;

    return this.setState(prevState => ({
      checked: prevState.checked.length !== wordsList.length ? [...wordsList.map(({ _id: id }) => id)] : [],
    }));
  };

  handleDeleteWord = () => {
    const { deleteWord } = this.props;
    const { checked } = this.state;

    return checked.length > 0 && Promise.resolve(checked.map(deleteWord)).then(() => this.setState({ checked: [] }));
  };

  generateUrl = params => {
    const { location } = this.props;

    return joinRoute({
      pathname: location.pathname,
      search: location.search,
      searchParams: params,
    });
  };

  handleOnChangeSelect = (event, field) => {
    const { history } = this.props;

    return history.push(this.generateUrl({ page: 1, [field]: event.target.value }));
  };

  handleOnChangeDirection = () => {
    const { location, history } = this.props;

    return history.push(
      this.generateUrl({
        sortDirection: parseSearchParams(location.search).sortDirection === 'descend' ? 'ascend' : 'descend',
      })
    );
  };

  handleOnChangePage = pageNumber => {
    const { history } = this.props;

    return history.push(this.generateUrl({ page: pageNumber }));
  };

  render() {
    const { checked } = this.state;
    const { wordsList, wordsCount, checkIsLoading, getWordsSearchParams, classes } = this.props;
    const { countPerPage, sortBy, sortDirection, page } = getWordsSearchParams();
    const loading = checkIsLoading(loadingNames.words.list);
    const isCheckedAll = checked.length === wordsList.length && checked.length > 0;

    return (
      <main>
        <div className={classes.wordsTableWrapper}>
          <Toolbar
            isAnyChecked={checked.length > 0}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onChangeSortDirection={this.handleOnChangeDirection}
            onChangeSortBy={event => this.handleOnChangeSelect(event, 'sortBy')}
            checkAllControl={<Checkbox onChange={this.handleOnCheckAll} checked={isCheckedAll} />}
          >
            <ButtonControl
              disabled={checked.length === 0}
              onClick={this.handleDeleteWord}
              color="primary"
              title="Delete"
            >
              <Delete />
            </ButtonControl>
          </Toolbar>
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
