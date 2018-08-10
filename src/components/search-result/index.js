import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { ExamplesList, ExamplesListItem, ControlsSeparator } from '..';
import { Button } from '../../mui-components';
import styles from './styles';

const SearchResult = ({ en, ru, examples, transcription, saveWord, editWordBeforeSaving, classes, pushWordToInput }) =>
  en && ru
    ? (
      <div>
        <ControlsSeparator>
          <Button onClick={saveWord}>Add to my words</Button>
          <Button onClick={editWordBeforeSaving}>Edit before saving</Button>
        </ControlsSeparator>
        <p><span>Russian: </span>{ru}</p>
        <p><span>English: </span>{en}</p>
        <p><span>Transcription: </span>{transcription}</p>
        <ExamplesList>
          {examples.map(({ example, id }) => (
            <ExamplesListItem
              key={id}
              example={example}
              pushWordToInput={pushWordToInput}
            />
          ))}
        </ExamplesList>
      </div>
    )
    : <div className={classes.noResults}>No results</div>;

SearchResult.propTypes = {
  en: PropTypes.string,
  ru: PropTypes.string,
  examples: PropTypes.arrayOf(PropTypes.object),
  transcription: PropTypes.string,
  editWordBeforeSaving: PropTypes.func.isRequired,
  saveWord: PropTypes.func.isRequired,
  pushWordToInput: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

SearchResult.defaultProps = {
  en: '',
  ru: '',
  examples: [],
  transcription: '',
};

const enhance = compose(
  injectSheet(styles),
);

export default enhance(SearchResult);
