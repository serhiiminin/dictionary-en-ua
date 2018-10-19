import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { joinRoute } from '../../helpers/search-params';
import routes from '../../routes';
import { WordItemInList } from '..';

const WordsList = ({ classes, wordsList, loading, countPerPage, checked, onWordCheck }) =>
  <div className={classes.wordsList}>
    {loading
      ? Array(countPerPage)
        .fill(null)
        .map(() => (
          <WordItemInList
            key={uuid()}
            loading={loading}
          />
        ))
      : wordsList
        .map(word => {
          const { _id } = word;
          const linkToWord = joinRoute(routes.words.list.root, null, [_id]);
          const isChecked = checked.includes(_id);

          return (
            <WordItemInList
              word={word}
              linkToWord={linkToWord}
              onWordCheck={onWordCheck}
              isChecked={isChecked}
              loading={loading}
              key={_id}
            />
          );
        })
    }
  </div>;

WordsList.propTypes = {
  wordsList: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })),
  classes: PropTypes.objectOf(PropTypes.string),
  loading: PropTypes.bool,
  countPerPage: PropTypes.number,
  checked: PropTypes.arrayOf(PropTypes.string),
  onWordCheck: PropTypes.func.isRequired,
};

WordsList.defaultProps = {
  classes: {},
  wordsList: null,
  loading: null,
  countPerPage: null,
  checked: null,
};

export default WordsList;
