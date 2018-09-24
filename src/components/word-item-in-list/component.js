import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import moment from 'moment';
import { Link } from 'react-router-dom';
import urljoin from 'url-join';
import { classesDefaultProps } from '../../constants/default-props';
import { classesShape } from '../../constants/shapes';
import routes from '../../routes';
import { ButtonWithRouter } from '..';

const WordItemInList = ({ classes, isChecked, _id, onWordCheck, en, ua, transcription, linkToWord, dateCreated }) => (
  <div className={`${classes.word} ${isChecked ? classes.wordChosen : ''}`}>
    <div>
      <Checkbox
        onChange={() => onWordCheck(_id)}
        checked={isChecked}
      />
    </div>
    <div className={classes.wordText}>
      <span>{en && <Link className={classes.linkToWord} to={linkToWord}>{en}</Link>}</span>
      {transcription && ` - ${transcription}`}
      {ua && ` - ${ua}`}
    </div>
    <div className={classes.wordTime}>
      {moment(dateCreated).fromNow()}
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
  </div>
);

WordItemInList.propTypes = {
  classes: classesShape,
  _id: PropTypes.string,
  en: PropTypes.string,
  ua: PropTypes.string,
  transcription: PropTypes.string,
  linkToWord: PropTypes.string,
  dateCreated: PropTypes.string,
  onWordCheck: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
};

WordItemInList.defaultProps = {
  classes: classesDefaultProps,
  _id: null,
  en: null,
  ua: null,
  transcription: null,
  linkToWord: null,
  dateCreated: null,
  isChecked: null,
};

export default WordItemInList;
