import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';
import LN from '../../constants/loading-names';
import { TitleBlock, WordListItem, WordList } from '../../components';

type Props = LI & WI & RouteComponentProps;

class WordsList extends Component<Props, {}> {
  public componentDidMount(): void {
    this.props.handleFetchWordsList();
  }

  public componentWillUnmount(): void {
    this.props.cleanWordsList();
  }

  public render(): JSX.Element {
    const { wordsList, checkIsLoading, handleDeleteWord } = this.props;
    const isLoading = checkIsLoading(LN.words.list);

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
  }
}

export default compose<Props, {}>(
  withRouter,
  withLoading,
  withWords
)(WordsList);
