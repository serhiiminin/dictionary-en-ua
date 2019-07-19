import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { compose } from 'recompose';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';

interface Match {
  id: string;
}

type Props = RouteComponentProps<Match> & LI & WI;

class WordPreviewContainer extends Component<Props, {}> {
  public componentDidMount(): void {
    const { match, handleFetchWord } = this.props;
    const { id } = match.params;

    handleFetchWord(id);
  }

  public componentWillUnmount(): void {
    this.props.cleanWord();
  }

  public render(): JSX.Element {
    const { wordItem } = this.props;
    const { word, transcription, gif } = wordItem;

    return (
      <div>
        <h1>{word}</h1>
        <p>{transcription}</p>
        <img src={gif} alt={word} />
      </div>
    );
  }
}

export default compose<Props, {}>(
  withRouter,
  withLoading,
  withWords
)(WordPreviewContainer);
