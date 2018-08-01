import React from 'react';
import { ExamplesList, ExamplesListItem } from '../';
import { Button } from '../../mui-components';

const SearchResult = ({ en, ru, examples, transcription, handleTextToForm }) =>
  en && ru && en !== ru
    ? (
      <div>
        <Button onClick={handleTextToForm}>Add to my list</Button>
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

export default SearchResult;
