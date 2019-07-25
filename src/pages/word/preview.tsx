import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'recompose';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';

interface Match {
  id: string;
}

type Props = RouteComponentProps<Match> & LI & WI;

const WordPreviewContainer = (props: Props): JSX.Element => {
  const { wordItem, handleFetchWord, cleanWord, match } = props;
  const { word, transcription, gif } = wordItem;
  const { id } = match.params;
  useEffect((): (() => void) => {
    handleFetchWord(id);

    return cleanWord;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <div>
      <h1>{word}</h1>
      <p>{transcription}</p>
      <img src={gif} alt={word} />
    </div>
  );
};

export default compose<Props, {}>(
  withRouter,
  withLoading,
  withWords
)(WordPreviewContainer);
