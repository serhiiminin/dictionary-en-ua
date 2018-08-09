import React from 'react';
import PropTypes from 'prop-types';
import { ExamplesList, ExamplesListItem, ControlsSeparator } from '..';
import { Button } from '../../mui-components';

const SearchResult = ({ en, ru, examples, transcription, addWord, editWordBeforeSaving }) =>
  en && ru
    ? (
      <div>
        <ControlsSeparator>
          <Button onClick={addWord}>Add to my words</Button>
          <Button onClick={editWordBeforeSaving}>Edit before saving</Button>
        </ControlsSeparator>
        <p><span>ru: </span>{ru}</p>
        <p><span>en: </span>{en}</p>
        <p>{transcription}</p>
        <ExamplesList>
          {examples.map(({ example, id }) => (
            <ExamplesListItem
              key={id}
              example={example}
            />
          ))}
        </ExamplesList>
      </div>
    )
    : <div>No results</div>;

SearchResult.propTypes = {
  en: PropTypes.string,
  ru: PropTypes.string,
  examples: PropTypes.arrayOf(PropTypes.object),
  transcription: PropTypes.string,
  editWordBeforeSaving: PropTypes.func.isRequired,
  addWord: PropTypes.func.isRequired,
};

SearchResult.defaultProps = {
  en: '',
  ru: '',
  examples: [],
  transcription: '',
};

export default SearchResult;
