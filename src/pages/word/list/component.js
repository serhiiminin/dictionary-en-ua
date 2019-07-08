import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import PropsTypes from 'prop-types';
import routes from '../../../routes';
import LN from '../../../constants/loading-names';
import { TitleBlock } from '../../../components';
import generateRoute from '../../../util/routes';

class WordsListContainer extends Component {
  static propTypes = {
    handleFetchWordsList: PropsTypes.func.isRequired,
    checkIsLoading: PropsTypes.func.isRequired,
    cleanWordsList: PropsTypes.func.isRequired,
    wordsList: PropsTypes.arrayOf(PropsTypes.shape({})),
  };

  static defaultProps = {
    wordsList: [],
  };

  componentDidMount() {
    this.props.handleFetchWordsList();
  }

  componentWillUnmount() {
    this.props.cleanWordsList();
  }

  render() {
    const { wordsList, checkIsLoading } = this.props;
    const isLoading = checkIsLoading(LN.words.list);

    const Words =
      wordsList.length === 0 ? (
        "You don't have saved words at the moment"
      ) : (
        <ul>
          {wordsList.map(({ _id, word }) => (
            <li key={_id}>
              <Link to={generateRoute(routes.words.preview, { id: _id })}>{word}</Link>
            </li>
          ))}
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

export default WordsListContainer;
