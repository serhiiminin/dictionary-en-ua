import React from 'react';
import PropTypes from 'prop-types';
import urljoin from 'url-join';
import uuid from 'uuid';
import routes from '../../routes';
import { WordItemInList } from '..';

const WordsList = ({ words, loading, countPerPage, checked }) =>
  loading
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
      });

WordsList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  words: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
  })),
  loading: PropTypes.bool,
  countPerPage: PropTypes.number,
  checked: PropTypes.arrayOf(PropTypes.string),
};

WordsList.defaultProps = {
  classes: {},
  words: null,
  loading: null,
  countPerPage: null,
  checked: null,
};

export default WordsList;
