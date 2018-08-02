import React from 'react';
import PropTypes from 'prop-types';
import { ExamplesList, ExamplesListItem } from '..';
import { Button } from '../../mui-components';

const SearchResult = ({ en, ru, examples, transcription, editBeforeSaving, addWordToList }) =>
  en && ru && en !== ru
    ? (
      <div>
        <Button onClick={addWordToList}>Add to my words</Button>
        <Button onClick={editBeforeSaving}>Edit before saving</Button>
        <p><span>ru: </span>{ru}</p>
        <p><span>en: </span>{en}</p>
        <p>{transcription}</p>
        <ExamplesList>
          {examples.map(example => (
            <ExamplesListItem key={example} example={example}/>
          ))}
        </ExamplesList>
      </div>
    )
    : <div>No results</div>;

SearchResult.propTypes = {
  en: PropTypes.string,
  ru: PropTypes.string,
  examples: PropTypes.arrayOf(PropTypes.string),
  transcription: PropTypes.string,
  editBeforeSaving: PropTypes.func.isRequired,
  addWordToList: PropTypes.func.isRequired,
};

SearchResult.defaultProps = {
  en: '',
  ru: '',
  examples: [],
  transcription: '',
};

export default SearchResult;
