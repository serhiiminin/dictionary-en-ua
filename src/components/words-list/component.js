import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import urljoin from 'url-join';
import { Checkbox, Fade, LinearProgress } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { classesDefaultProps } from '../../constants/default-props';
import loadingNames from '../../constants/loading-names';
import { classesShape } from '../../constants/shapes';
import { getTime } from '../../helpers/dates';
import routes from '../../routes';
import { Button } from '../../components-mui';
import { ButtonWithRouter } from '../index';

class WordsList extends Component {
  static propTypes = {
    classes: classesShape,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        en: PropTypes.string,
        ru: PropTypes.string,
        transcription: PropTypes.string,
        dateCreated: PropTypes.string,
      })),
    currentLoadingNames: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    classes: classesDefaultProps,
    words: null,
    currentLoadingNames: null,
  };

  state = {
    checked: [],
    sortBy: 'dateCreated',
    sortOrder: 'ascend',
    pagination: 1,
  };

  handleOnCheck = id => this.setState(prevState => ({
    ...prevState,
    checked: prevState.checked.find(wordId => wordId === id)
      ? prevState.checked.filter(wordId => wordId !== id)
      : [...prevState.checked, id]
  }));

  handleOnAll = () => this.setState(prevState => ({
    ...prevState,
    checked: prevState.checked.length !== this.props.words.length
      ? [...this.props.words.map(word => word._id)]
      : []
  }));

  render() {
    const { checked } = this.state;
    const { classes, words, currentLoadingNames } = this.props;
    const loading = currentLoadingNames.includes(loadingNames.wordsList);
    const isCheckedAll = checked.length === words.length && checked.length > 0;

    return (
      <main className={classes.myWords}>
        <Fade
          in={loading}
          style={{ transitionDelay: loading ? '300ms' : '' }}
        >
          <LinearProgress color='secondary'/>
        </Fade>
        <ul className={classes.wordsList}>
          <li className={classes.toolbar}>
            <div>
               <Checkbox
                 onChange={() => this.handleOnAll()}
                 checked={isCheckedAll}
               />
            </div>
            <div className={classes.toolbarButtons}>
              <Button title='Delete' variant="fab" mini>
                <Delete/>
              </Button>
            </div>
          </li>
          {words
            .sort((a, b) => getTime(b.dateCreated) - getTime(a.dateCreated))
            .map(word => {
              const { _id, en, ru, transcription, dateCreated } = word;
              const linkToWord = urljoin(routes.words.list.root, _id);
              const isChecked = checked.includes(_id);

              return (
                <li
                  className={`${classes.word} ${isChecked ? classes.wordChosen : ''}`}
                  key={_id}
                >
                  <div>
                    <Checkbox
                      onChange={() => this.handleOnCheck(_id)}
                      checked={isChecked}
                    />
                  </div>
                  <div className={classes.wordText}>
                    <span>
                      <Link className={classes.linkToWord} to={linkToWord}>{en}</Link>
                    </span>
                    {` - ${transcription} - ${ru}`}
                  </div>
                  <div className={classes.wordTime}>
                    {moment(dateCreated)
                      .fromNow()}
                  </div>
                  <div>
                    <ButtonWithRouter
                      to={urljoin(routes.words.list.root, _id, 'edit')}
                      title='Edit'
                      variant="fab"
                      mini
                    >
                      <Edit/>
                    </ButtonWithRouter>
                  </div>
                </li>
              );
            })}
        </ul>
      </main>
    );
  }
}

export default WordsList;
