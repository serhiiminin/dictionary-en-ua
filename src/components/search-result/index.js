import React from 'react';
import { ExamplesList, ExamplesListItem } from '../';

const SearchResult = ({ en, ru, examples, transcription }) =>
  en && ru && en !== ru
    ? (
      <div>
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
