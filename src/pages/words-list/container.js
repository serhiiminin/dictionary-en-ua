import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { WordsTable } from '../../components';

class WordsListContainer extends Component {
  static propTypes = {
    fetchWordsList: PropTypes.func.isRequired,
    cleanWordsList: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  };

  componentDidMount() {
    this.props.fetchWordsList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.fetchWordsList();
    }
  }

  componentWillUnmount() {
    this.props.cleanWordsList();
  }

  render() {
    return <WordsTable />;
  }
}

export default WordsListContainer;
