import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Route, Switch } from 'react-router-dom';
import { WordsTable } from '../../components';
import routes from '../../routes';
import WordEdit from '../words-edit';

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
    return (
      <Switch>
        <Route exact path={routes.words.list.all} component={WordsTable}/>
        <Route exact path={routes.words.list.preview} render={() => 'Preview'}/>
        <Route exact path={routes.words.list.edit} component={WordEdit}/>
      </Switch>
    );
  }
}

export default WordsListContainer;
