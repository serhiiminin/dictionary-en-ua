import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';
import routes from '../../../routes';
import { generatePath } from '../../../util/path';

class WordsListContainer extends Component {
  static propTypes = {
    handleFetchWordsList: PropsTypes.func.isRequired,
    wordsList: PropsTypes.arrayOf(PropsTypes.shape({})),
  };

  static defaultProps = {
    wordsList: null,
  };

  componentDidMount() {
    this.props.handleFetchWordsList();
  }

  render() {
    const { wordsList } = this.props;

    return (
      <div>
        List
        <ul>
          {wordsList &&
            wordsList.map(({ _id, word }) => {
              const to = generatePath(routes.words.preview, { id: _id });

              return (
                <li key={_id}>
                  <Link to={to}>{word}</Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default WordsListContainer;
