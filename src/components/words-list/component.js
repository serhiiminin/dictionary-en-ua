import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from '@material-ui/core';
import uuid from 'uuid';
import { joinPath } from 'url-joiner';
import routes from '../../routes';
import { WordItemInList } from '..';

const WordsList = ({ wordsList, loading, countPerPage, checked, onWordCheck }) => (
  <List>
    {loading
      ? Array(countPerPage)
          .fill(null)
          .map(() => (
            <ListItem key={uuid()} divider>
              <WordItemInList loading={loading} />
            </ListItem>
          ))
      : wordsList.map(wordItem => {
          const { _id } = wordItem;
          const linkToWord = joinPath(routes.words.list, _id);
          const isChecked = checked.includes(_id);

          return (
            <ListItem key={_id} divider>
              <WordItemInList
                wordItem={wordItem}
                linkToWord={linkToWord}
                onWordCheck={onWordCheck}
                isChecked={isChecked}
                loading={loading}
              />
            </ListItem>
          );
        })}
  </List>
);

WordsList.propTypes = {
  wordsList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  countPerPage: PropTypes.number,
  checked: PropTypes.arrayOf(PropTypes.string),
  onWordCheck: PropTypes.func.isRequired,
};

WordsList.defaultProps = {
  wordsList: null,
  loading: null,
  countPerPage: null,
  checked: null,
};

export default WordsList;
