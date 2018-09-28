import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Fade, CircularProgress } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import moment from 'moment';
import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import routes from '../../routes';
import { ButtonWithRouter } from '..';

const EMPTY_VALUE = '-';

const WordItemInList = props => {
  const { classes, isChecked, onWordCheck, word, linkToWord, loading } = props;
  const { _id, en, ua, transcription, dateCreated, dateLastLearnt, timesLearnt } = word;
  const lastLearnt = dateLastLearnt && (dateLastLearnt === new Date(0).toISOString()
    ? 'Never'
    : moment(dateLastLearnt)
      .fromNow());

  return (
    <div className={`${classes.word} ${isChecked && classes.wordChosen} ${loading && classes.wordLoading}`}>
      <Checkbox
        onChange={() => onWordCheck(_id)}
        checked={isChecked}
        disabled={loading}
      />
      <div className={classes.wordDescription}>
        <div className={classes.wordTitle}>
          {en && <Link className={classes.linkToWord} to={linkToWord}>{en}</Link>}
          {[en && ' ', transcription, ua]
            .filter(Boolean).join(' - ')}
          {loading && (
            <Fade in={loading}>
              <CircularProgress color='secondary' size={20}/>
            </Fade>
          )}
        </div>
        <div className={classes.lastLearn}>
          {[
            timesLearnt != null && `Times learnt: ${timesLearnt}`,
            lastLearnt && `Last learnt: ${lastLearnt}`,
          ].filter(Boolean).join(` · `)}
        </div>
      </div>
      <div className={classes.wordTime}>
        {(dateCreated && moment(dateCreated).fromNow()) || EMPTY_VALUE}
      </div>
      <ButtonWithRouter
        to={urljoin(routes.words.list.root, _id, 'edit')}
        disabled={loading}
        title='Edit'
        variant="fab"
        mini
      >
        <Edit/>
      </ButtonWithRouter>
    </div>
  );
};

WordItemInList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  word: PropTypes.shape({
    _id: PropTypes.string,
    en: PropTypes.string,
    ua: PropTypes.string,
    transcription: PropTypes.string,
    dateCreated: PropTypes.string,
  }),
  linkToWord: PropTypes.string,
  onWordCheck: PropTypes.func,
  isChecked: PropTypes.bool,
  loading: PropTypes.bool,
};

WordItemInList.defaultProps = {
  classes: {},
  word: {
    _id: '',
    en: null,
    ua: null,
    transcription: null,
    dateCreated: null,
    onWordCheck: null,
  },
  onWordCheck: null,
  linkToWord: null,
  isChecked: null,
  loading: null,
};

export default WordItemInList;
