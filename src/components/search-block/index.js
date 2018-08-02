import React from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { SearchResult } from '../';
import { TextField } from '../../mui-components';
import styles from './styles';

const SearchBlock = ({ classes, foundTranslation, inputValue, onChange, editBeforeSaving, addWordToList }) => {
  const { ru, en, examples, transcription } = foundTranslation;

  return (
    <div
      className={classes.searchBlock}
    >
      <h3>Try to search</h3>
      <TextField
        value={inputValue}
        placeholder="Search a word"
        onChange={onChange}
      />
      <SearchResult
        en={en}
        ru={ru}
        examples={examples}
        transcription={transcription}
        editBeforeSaving={editBeforeSaving}
        addWordToList={addWordToList}
      />
    </div>
  );
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(SearchBlock);
