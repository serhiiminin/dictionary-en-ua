import React from 'react';

const WordsListItem = ({ word, classes }) => {
  const { en, ru, transcription, example, date } = word;
  return (
    <div className={classes}>
      <h5>{ru}</h5>
      <h5>{en}</h5>
      <h5>{transcription}</h5>
      <p>{example}</p>
      <p>{date}</p>
    </div>
  );
};

export default WordsListItem;
