import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { WordsTable } from '../../../components';

class WordsListContainer extends Component {
  static propTypes = {
    fetchWordsList: PropTypes.func.isRequired,
    cleanWordsList: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  };

  componentDidMount() {
    const { fetchWordsList } = this.props;

    fetchWordsList();
  }

  componentDidUpdate(prevProps) {
    const { location, fetchWordsList } = this.props;
    if (location.search !== prevProps.location.search) {
      fetchWordsList();
    }
  }

  componentWillUnmount() {
    const { cleanWordsList } = this.props;

    cleanWordsList();
  }

  render() {
    return <WordsTable />;
  }
}

export default WordsListContainer;
