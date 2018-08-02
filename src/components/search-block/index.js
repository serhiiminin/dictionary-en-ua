import React from 'react';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { SearchResult } from '../';
import { TextField } from '../../mui-components';
import styles from './styles';

const SearchBlock = ({ classes, foundTranslation, inputValue, onChange, textToForm }) => {
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
        handleTextToForm={textToForm}
        en={en}
        ru={ru}
        examples={examples}
        transcription={transcription}/>
    </div>
  );
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(SearchBlock);
