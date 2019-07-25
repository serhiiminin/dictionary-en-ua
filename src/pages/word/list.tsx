import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';
import LN from '../../constants/loading-names';
import { TitleBlock, WordListItem, WordList } from '../../components';

type Props = LI & WI & RouteComponentProps;

const WordsList = (props: Props): JSX.Element => {
  const { wordsList, checkIsLoading, handleDeleteWord, handleFetchWordsList, cleanWordsList } = props;
  const isLoading = checkIsLoading(LN.words.list);
  useEffect((): (() => void) => {
    handleFetchWordsList();

    return cleanWordsList;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TitleBlock>Your words</TitleBlock>
      <WordList isLoading={isLoading}>
        {wordsList.map(
          (word): JSX.Element => (
            <WordListItem key={word._id} word={word} onDelete={handleDeleteWord} />
          )
        )}
      </WordList>
    </>
  );
};

export default compose<Props, {}>(
  withRouter,
  withLoading,
  withWords
)(WordsList);
