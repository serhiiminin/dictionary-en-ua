import React from 'react';
import { ExamplesList, ExamplesListItem } from '../';

const SearchResult = ({ en, ru, example, transcription }) =>
  en && ru && en !== ru
    ? (
      <div>
        <p><span>ru: </span>{ru}</p>
        <p><span>en: </span>{en}</p>
        <p>{transcription}</p>
        <ul>
          {example.map(text => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>
    )
    : <div>No results</div>;


export default SearchResult;
