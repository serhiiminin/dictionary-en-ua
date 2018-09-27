import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import urljoin from 'url-join';
import { Checkbox, Fade, LinearProgress } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import loadingNames from '../../constants/loading-names';
import { mergeSearchParams, parseSearchParams } from '../../helpers/search-params';
import routes from '../../routes';
import { Button } from '../../components-mui';
import { PaginationPanel, Toolbar, WordsList } from '..';

class WordsTable extends Component {
  static propTypes = {
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
      })),
    classes: PropTypes.objectOf(PropTypes.string),
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    wordsCount: PropTypes.number,
    deleteWord: PropTypes.func.isRequired,
    getWordsSearchParams: PropTypes.func.isRequired,
    currentLoadingNames: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    classes: {},
    words: null,
    wordsCount: null,
    currentLoadingNames: null,
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
    checked: prevState.checked.length !== this.props.words.length
      ? [...this.props.words.map(word => word._id)]
      : []
  }));

  handleDeleteWord = () => this.state.checked.length > 0 &&
    Promise.resolve(this.state.checked.map(id => this.props.deleteWord(id)))
      .then(() => this.setState({ checked: [] }));

  generateUrl = (route, params) => urljoin(
    route,
    `?${mergeSearchParams(
      { ...params },
      this.props.location.search,
    )}`
  );

  handleOnChangeSelect = (event, field) =>
    this.props.history.push(this.generateUrl(
      routes.words.list.all,
      { page: 1, [field]: event.target.value }
    ));

  handleOnChangeDirection = () => this.props.history.push(
    this.generateUrl(
      routes.words.list.all,
      { sortDirection: parseSearchParams(this.props.location.search).sortDirection === 'descend' ? 'ascend' : 'descend' },
    ));

  handleOnChangePage = pageNumber => this.props.history.push(
    this.generateUrl(
      routes.words.list.all,
      { page: pageNumber },
    )
  );

  render() {
    const { checked } = this.state;
    const { classes, words, wordsCount, currentLoadingNames, getWordsSearchParams, location } = this.props;
    const { countPerPage, sortBy, sortDirection, page } = getWordsSearchParams(location);
    const loading = currentLoadingNames.includes(loadingNames.wordsList);
    const isCheckedAll = checked.length === words.length && checked.length > 0;

    return (
      <main>
        <Fade in={loading}>
          <LinearProgress color='secondary'/>
        </Fade>
        <div className={classes.wordsList}>
          <Toolbar
            checkAllControl={<Checkbox onChange={this.handleOnCheckAll} checked={isCheckedAll}/>}
            isAnyChecked={checked.length > 0}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onChangeSortDirection={this.handleOnChangeDirection}
            onChangeSortBy={event => this.handleOnChangeSelect(event, 'sortBy')}
          >
            <Button disabled={checked.length === 0} title='Delete' variant="fab" mini>
              <Delete onClick={this.handleDeleteWord}/>
            </Button>
          </Toolbar>
          <WordsList
            words={words}
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
