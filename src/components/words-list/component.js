import { Checkbox, Fade, LinearProgress } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import { classesDefaultProps } from '../../constants/default-props';
import loadingNames from '../../constants/loading-names';
import { classesShape } from '../../constants/shapes';
import { getTime } from '../../helpers/dates';
import routes from '../../routes';

class WordsList extends Component {
  static propTypes = {
    classes: classesShape,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        en: PropTypes.string,
        ru: PropTypes.string,
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
  };

  handleOnCheck = id =>
    this.setState(prevState => ({
      ...prevState,
      checked: prevState.checked.find(wordId => wordId === id)
        ? prevState.checked.filter(wordId => wordId !== id)
        : [...prevState.checked, id]
    }));

  render() {
    const { checked } = this.state;
    const { classes, words, currentLoadingNames } = this.props;
    const loading = currentLoadingNames.includes(loadingNames.wordsList);

    return (
      <main className={classes.myWords}>
        <Fade
          in={loading}
          style={{ transitionDelay: loading ? '300ms' : '' }}
        >
          <LinearProgress color='secondary'/>
        </Fade>
        <ul className={classes.wordsList}>
          {words
            .sort((a, b) => getTime(b.dateCreated) - getTime(a.dateCreated))
            .map(word => {
              const { _id, en, ru, dateCreated } = word;
              const linkToWord = urljoin(routes.words.list.root, _id);
              const isChecked = checked.includes(_id);

              return (
                <li
                  className={`${classes.word} ${isChecked ? classes.wordChosen : ''}`}
                  key={_id}
                >
                  <span>
                    <Checkbox
                      onChange={() => this.handleOnCheck(_id)}
                      checked={isChecked}
                    />
                  </span>
                  <span className={classes.wordText}>
                    <Link className={classes.linkToWord} to={linkToWord}>{en}</Link> - {ru}
                  </span>
                  <span className={classes.wordTime}>
                    {moment(dateCreated).fromNow()}
                  </span>
                </li>
              );
            })}
        </ul>
      </main>
    );
  }
}

export default WordsList;
