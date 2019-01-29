import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Edit from '@material-ui/icons/Edit';
import { Checkbox, Fade, CircularProgress, Grid, ListItemText } from '@material-ui/core';
import { joinRoute } from 'url-joiner';
import routes from '../../routes';
import { ButtonWithRouter } from '..';
import composeClassesPropTypes from '../../modules/compose-classes-prop-types';
import styles from './styles';

const EMPTY_VALUE = '-';

const WordItemInList = props => {
  const { isChecked, onWordCheck, wordItem, linkToWord, loading, classes } = props;
  const { _id, word, transcription, dateCreated, dateLastLearnt, timesLearnt } = wordItem;
  const lastLearnt =
    dateLastLearnt && dateLastLearnt === new Date(0).toISOString() ? 'Never' : moment(dateLastLearnt).fromNow();

  return (
    <Grid container spacing={16} alignItems="center" className={classes.wordItemWrapper}>
      <Grid item xs={1}>
        <Checkbox onChange={() => onWordCheck(_id)} checked={isChecked} disabled={loading}/>
      </Grid>
      <Grid item xs={7} className={classes.description}>
        <ListItemText
          primary={
            loading ? (
              <Fade in={loading}>
                <CircularProgress color="secondary" size={20}/>
              </Fade>
            ) : (
              <Fragment>
                {word && (
                  <Link className={classes.wordLink} to={linkToWord}>
                    {word}
                  </Link>
                )}
                {[word && ' ', transcription && `[${transcription}]`].filter(Boolean)
                  .join(' - ')}
              </Fragment>
            )
          }
          secondary={[timesLearnt != null && `Times learnt: ${timesLearnt}`, lastLearnt && `Last learnt: ${lastLearnt}`]
            .filter(Boolean)
            .join(` · `)}
        />
      </Grid>
      <Grid item xs={3}>
        <div className={classes.wordTime}>{(dateCreated && moment(dateCreated)
          .fromNow()) || EMPTY_VALUE}</div>
      </Grid>
      <Grid item xs={1}>
        <ButtonWithRouter
          to={joinRoute({
            pathname: routes.words.list.root,
            paths: [_id, 'edit']
          })}
          disabled={loading}
          title="Edit"
        >
          <Edit/>
        </ButtonWithRouter>
      </Grid>
    </Grid>
  );
};

WordItemInList.propTypes = {
  wordItem: PropTypes.shape({
    _id: PropTypes.string,
    word: PropTypes.string,
    transcription: PropTypes.string,
    dateCreated: PropTypes.string
  }),
  linkToWord: PropTypes.string,
  onWordCheck: PropTypes.func,
  isChecked: PropTypes.bool,
  loading: PropTypes.bool,
  classes: composeClassesPropTypes(styles)
};

WordItemInList.defaultProps = {
  wordItem: {
    _id: '',
    word: '',
    transcription: '',
    dateCreated: ''
  },
  onWordCheck: () => {
  },
  linkToWord: '',
  isChecked: false,
  loading: false,
  classes: {}
};

export default WordItemInList;
