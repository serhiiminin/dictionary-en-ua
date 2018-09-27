import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import urljoin from 'url-join';
import uuid from 'uuid';
import { Checkbox, Fade, LinearProgress } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import loadingNames from '../../constants/loading-names';
import { mergeSearchParams, parseSearchParams } from '../../helpers/search-params';
import routes from '../../routes';
import { Button } from '../../components-mui';
import { PaginationPanel, SelectWithOptions, Toolbar, WordItemInList } from '..';

class WordsList extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string),
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
      })),
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
          <Toolbar checkAllControl={<Checkbox onChange={this.handleOnCheckAll} checked={isCheckedAll}/>}>
            <Button
              onClick={this.handleOnChangeDirection}
              title='Sort direction'
              variant="raised"
              mini
            >
              {sortDirection === 'descend' ? <KeyboardArrowDown/> : <KeyboardArrowUp/>}
            </Button>
            <div className={classes.countPerPage}>
              <SelectWithOptions
                value={sortBy}
                label='Sort by'
                onChange={event => this.handleOnChangeSelect(event, 'sortBy')}
                options={[
                  { key: 'en', title: 'English' },
                  { key: 'ua', title: 'Ukrainian' },
                  { key: 'dateCreated', title: 'Was added' },
                  { key: 'timesLearnt', title: 'Was learnt times' },
                  { key: 'dateLastLearnt', title: 'Was learnt last time' },
                ]}
              />
            </div>
            <Button disabled={checked.length === 0} title='Delete' variant="fab" mini>
              <Delete onClick={this.handleDeleteWord}/>
            </Button>
          </Toolbar>
          {loading
            ? Array(countPerPage)
              .fill(null)
              .map(() => (
                <WordItemInList
                  key={uuid()}
                  loading={loading}
                />
              ))
            : words
              .map(word => {
                const { _id } = word;
                const linkToWord = urljoin(routes.words.list.root, _id);
                const isChecked = checked.includes(_id);

                return (
                  <WordItemInList
                    word={word}
                    linkToWord={linkToWord}
                    onWordCheck={this.handleOnCheck}
                    isChecked={isChecked}
                    loading={loading}
                    key={_id}
                  />
                );
              })}
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

export default WordsList;
