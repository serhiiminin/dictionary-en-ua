import React, { Component } from 'react';
import { compose } from 'recompose';
import { LinearProgress } from '@material-ui/core';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { withLoading, LI } from '../../context/loading';
import { withWords, WI } from '../../context/words';

import routes from '../../routes';
import LN from '../../constants/loading-names';
import { TitleBlock } from '../../components';
import generateRoute from '../../util/routes';

type Props = LI & WI & RouteComponentProps;

class WordsList extends Component<Props, {}> {
  public componentDidMount(): void {
    this.props.handleFetchWordsList();
  }

  public componentWillUnmount(): void {
    this.props.cleanWordsList();
  }

  public render(): JSX.Element {
    const { wordsList, checkIsLoading } = this.props;
    const isLoading = checkIsLoading(LN.words.list);

    const Words =
      wordsList.length === 0 ? (
        "You don't have saved words at the moment"
      ) : (
        <ul>
          {wordsList.map(
            ({ _id, word }): JSX.Element => (
              <li key={_id}>
                <Link to={generateRoute(routes.words.preview, { id: _id })}>{word}</Link>
              </li>
            )
          )}
        </ul>
      );
    return (
      <>
        <TitleBlock>Your words</TitleBlock>
        {isLoading ? <LinearProgress /> : Words}
      </>
    );
  }
}

export default compose<Props, {}>(
  withRouter,
  withLoading,
  withWords
)(WordsList);
