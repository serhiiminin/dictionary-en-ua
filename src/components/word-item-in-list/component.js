import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Fade, CircularProgress } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import moment from 'moment';
import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import routes from '../../routes';
import { ButtonWithRouter } from '..';

const WordItemInList = props => {
  const { classes, isChecked, onWordCheck, word, linkToWord, loading } = props;
  const { _id, en, ua, transcription, dateCreated } = word;

  return (
    <div className={`${classes.word} ${isChecked && classes.wordChosen} ${loading && classes.wordLoading}`}>
      <div>
        <Checkbox
          onChange={() => onWordCheck(_id)}
          checked={isChecked}
          disabled={loading}
        />
      </div>
      <div className={classes.wordText}>
        <span>{en && <Link className={classes.linkToWord} to={linkToWord}>{en}</Link>}</span>
        {transcription && ` - ${transcription}`}
        {ua && ` - ${ua}`}
        {loading && (
          <Fade in={loading}>
            <CircularProgress color='secondary' size={20}/>
          </Fade>
        )}
      </div>
      <div className={classes.wordTime}>
        {(dateCreated && moment(dateCreated)
          .fromNow()) || '–'}
      </div>
      <div>
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
    </div>
  );
};

WordItemInList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  word: {
    _id: PropTypes.string,
    en: PropTypes.string,
    ua: PropTypes.string,
    transcription: PropTypes.string,
    dateCreated: PropTypes.string,
  },
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
