import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { SearchResult } from '..';
import { withWords } from '../../context/words';
import { TextField } from '../../mui-components';
import styles from './styles';

const SearchBlock = ({ classes, searchValue, onChange, foundWord, addWord, editWordBeforeSaving }) => {
  const { en, ru, examples, transcription } = foundWord;

  return (
    <div className={classes.searchBlock}>
      <h3>Try to search</h3>
      <TextField
        value={searchValue}
        placeholder="Search a word"
        onChange={onChange}
      />
      <SearchResult
        en={en}
        ru={ru}
        examples={examples}
        transcription={transcription}
        addWord={addWord}
        editWordBeforeSaving={editWordBeforeSaving}
      />
    </div>
  );
};

SearchBlock.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  foundWord: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  addWord: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  editWordBeforeSaving: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

SearchBlock.defaultProps = {
  searchValue: '',
};

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(SearchBlock);
