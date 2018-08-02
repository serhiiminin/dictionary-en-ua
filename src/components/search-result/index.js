import React from 'react';
import { ExamplesList, ExamplesListItem } from '../';
import { Button } from '../../mui-components';

const SearchResult = ({ en, ru, examples, transcription, textToForm }) =>
  en && ru && en !== ru
    ? (
      <div>
        <Button onClick={textToForm}>Add to my list</Button>
        <Button onClick={textToForm}>Edit before saving</Button>
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
