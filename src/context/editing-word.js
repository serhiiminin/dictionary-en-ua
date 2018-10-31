import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withFoundWord } from './found-word';
import { withLoadingNames } from './loading-names';
import { withNotifications } from './notifications';

const EditingWord = createContext({});

class EditingWordCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    editingWord: {},
  };

  cleanEditingWord = () => this.setState({ editingWord: {} });

  setEditingWord = editingWord => this.setState({ editingWord });

  render() {
    const { editingWord } = this.state;
    const { children } = this.props;

    return (
      <EditingWord.Provider
        value={{
          editingWord,
          setEditingWord: this.setEditingWord,
          cleanEditingWord: this.cleanEditingWord,
        }}
      >{children}</EditingWord.Provider>
    );
  }
}

const EditingWordProvider = compose(
  withRouter,
  withFoundWord,
  withLoadingNames,
  withNotifications,
)(EditingWordCmp);

const withEditingWord = Cmp => props =>
  <EditingWord.Consumer>{value => <Cmp {...value} {...props} />}</EditingWord.Consumer>;

export { EditingWordProvider, withEditingWord };
