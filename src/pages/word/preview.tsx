import React, { useContext, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { WordsContext } from '../../context/words';

const WordPreviewContainer = (): JSX.Element => {
  const match = useRouteMatch();
  const { id } = match.params;
  const { wordItem, handleFetchWord, cleanWord } = useContext(WordsContext);
  const { word, transcription, gif } = wordItem;
  useEffect((): (() => void) => {
    handleFetchWord(id);

    return cleanWord;
  }, [id]);
  return (
    <div>
      <h1>{word}</h1>
      <p>{transcription}</p>
      <img src={gif} alt={word} />
    </div>
  );
};

export default WordPreviewContainer;
