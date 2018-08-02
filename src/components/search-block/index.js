import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { SearchResult } from '..';
import { TextField } from '../../mui-components';
import styles from './styles';

const SearchBlock = ({ classes, foundTranslation, inputValue, onChange, editBeforeSaving, addWordToList }) => {
  const { ru, en, examples, transcription } = foundTranslation;

  return (
    <div className={classes.searchBlock}>
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

SearchBlock.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  foundTranslation: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inputValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  editBeforeSaving: PropTypes.func.isRequired,
  addWordToList: PropTypes.func.isRequired,
};

SearchBlock.defaultProps = {
  foundTranslation: {},
  inputValue: '',
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(SearchBlock);
