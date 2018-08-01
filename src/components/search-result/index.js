import React from 'react';

const WordsListItem = ({ en, ru, example, transcription }) =>
  en && ru
    ? (
      <div>
        <p>{ru}</p>
        <p>{en}</p>
        <p>{transcription}</p>
        <ul>
          {example.map(text => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>
    )
    : 'No results';


export default WordsListItem;
