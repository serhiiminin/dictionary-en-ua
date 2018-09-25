import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import urljoin from 'url-join';
import uuid from 'uuid';
import { Checkbox, Fade, LinearProgress } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { classesDefaultProps } from '../../constants/default-props';
import loadingNames from '../../constants/loading-names';
import { classesShape } from '../../constants/shapes';
import { joinSearchParams, parseSearchParams } from '../../helpers/search-params';
import routes from '../../routes';
import { Button } from '../../components-mui';
import { Pagination, SelectWithOptions, Toolbar, WordItemInList } from '..';

class WordsList extends Component {
  static propTypes = {
    classes: classesShape,
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        en: PropTypes.string,
        ua: PropTypes.string,
        transcription: PropTypes.string,
        dateCreated: PropTypes.string,
      })),
    wordsCount: PropTypes.number,
    deleteWord: PropTypes.func.isRequired,
    currentLoadingNames: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    classes: classesDefaultProps,
    words: null,
    wordsCount: null,
    currentLoadingNames: null,
  };

  state = {
    checked: [],
    sortBy: 'dateCreated',
    sortDirection: 'descend',
    page: 1,
    countPerPage: 5,
  };

  componentDidMount() {
    const { location } = this.props;
    const parsedParams = parseSearchParams(location.search);

    this.setState(prevState => ({
      ...prevState,
      ...parsedParams,
    }));
    this.pushSearchParams();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.countPerPage !== this.state.countPerPage || prevState.sortBy !== this.state.sortBy ||
      prevState.sortDirection !== this.state.sortDirection || prevState.page !== this.state.page) {
      this.pushSearchParams();
    }
  }

  pushSearchParams = () => {
    const { sortBy, sortDirection, page, countPerPage } = this.state;
    const searchQuery = joinSearchParams({ sortBy, sortDirection, page, countPerPage });

    this.props.history.push(`${routes.words.list.all}?${searchQuery}`);
  };

  handleOnCheck = id => this.setState(prevState => ({
    checked: prevState.checked.find(wordId => wordId === id)
      ? prevState.checked.filter(wordId => wordId !== id)
      : [...prevState.checked, id]
  }));

  handleOnAll = () => this.setState(prevState => ({
    checked: prevState.checked.length !== this.props.words.length
      ? [...this.props.words.map(word => word._id)]
      : []
  }));

  handleDeleteWord = () => this.state.checked.length > 0 &&
    Promise.all([
      ...this.state.checked.map(id => this.props.deleteWord(id))
    ])
      .then(() => this.setState({ checked: [] }));

  handleOnChangeSelect = (event, field) => this.setState({
    page: 1,
    [field]: event.target.value
  });

  handleOnChangeDirection = () => this.setState(prevState => ({
    sortDirection: prevState.sortDirection === 'descend' ? 'ascend' : 'descend',
  }));

  handleOnChangePage = pageNumber => this.setState({ page: pageNumber });

  render() {
    const { checked, countPerPage, sortBy, sortDirection, page } = this.state;
    const { classes, words, wordsCount, currentLoadingNames } = this.props;
    const loading = currentLoadingNames.includes(loadingNames.wordsList);
    const isCheckedAll = checked.length === words.length && checked.length > 0;

    return (
      <main>
        <Fade in={loading} style={{ transitionDelay: loading ? '300ms' : '' }}>
          <LinearProgress color='secondary'/>
        </Fade>
        <div className={classes.wordsList}>
          <Toolbar checkAllControl={<Checkbox onChange={this.handleOnAll} checked={isCheckedAll}/>}>
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
            ? Array(countPerPage).fill(null)
              .map(() => (
                <WordItemInList
                  id={uuid()}
                  key={uuid()}
                  loading={loading}
                />
              ))
            : words
              .map(word => {
                const { _id, en, ua, transcription, dateCreated } = word;
                const linkToWord = urljoin(routes.words.list.root, _id);
                const isChecked = checked.includes(_id);

                return (
                  <WordItemInList
                    id={_id}
                    en={en}
                    ua={ua}
                    transcription={transcription}
                    linkToWord={linkToWord}
                    dateCreated={dateCreated}
                    onWordCheck={this.handleOnCheck}
                    isChecked={isChecked}
                    loading={loading}
                    key={_id}
                  />
                );
              })}
          <div className={classes.bottomPanel}>
            <SelectWithOptions
              onChange={event => this.handleOnChangeSelect(event, 'countPerPage')}
              value={Number(countPerPage)}
              label='Words per page'
              options={[
                { key: 1, title: 1 },
                { key: 5, title: 5 },
                { key: 10, title: 10 },
                { key: 25, title: 25 },
                { key: 50, title: 50 },
                { key: 100, title: 100 },
              ]}
            />
            <Pagination
              pageNumber={page}
              maxPageCount={Math.ceil(wordsCount / countPerPage)}
              onChangePage={this.handleOnChangePage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default WordsList;
