import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { apiUser } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import { withAuth } from './auth';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../modules/handle-fetch';
import { withErrors } from './errors';

const UserContext = createContext({});

const userInitialState = {
  user: {},
};

class UserProviderCmp extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    tokenData: PropTypes.shape({}),
    enqueueSnackbar: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tokenData: null,
  };

  state = userInitialState;

  handleFetch = () => {
    const { startLoading, stopLoading, handleError } = this.props;

    return createHandleFetch({
      startLoading,
      stopLoading,
      errorHandler: handleError,
    });
  };

  cleanUser = () => this.setState(userInitialState);

  setUserToState = user => this.setState({ user });

  fetchUser = id => {
    const { tokenData } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.user.fetch,
      apiHandler: apiUser.get(id, tokenData.token),
    });
  };

  createUser = user => {
    const { tokenData, enqueueSnackbar } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.user.fetch,
      apiHandler: apiUser
        .create({ ...user }, tokenData && tokenData.token)
        .then(() =>
          enqueueSnackbar('The user has been saved successfully', {
            variant: notificationType.success,
          })
        ),
    });
  };

  editUser = user => {
    const { tokenData, enqueueSnackbar } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.user.fetch,
      apiHandler: apiUser.update(user, tokenData && tokenData.token).then(() =>
        enqueueSnackbar('The user has been updated successfully', {
          variant: notificationType.success,
        })
      ),
    });
  };

  deleteUser = id => {
    const { tokenData, enqueueSnackbar } = this.props;

    return this.handleFetch()({
      loadingName: loadingNames.user.fetch,
      apiHandler: apiUser
        .delete(id, tokenData && tokenData.token)
        .then(this.fetchWordsList),
    }).then(() =>
      enqueueSnackbar('The user has been deleted successfully', {
        variant: notificationType.success,
      })
    );
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;

    return (
      <UserContext.Provider
        value={{
          user,
          setUserToState: this.setUserToState,
          cleanUser: this.cleanUser,
          fetchUser: this.fetchUser,
          createUser: this.createUser,
          editUser: this.editUser,
          deleteUser: this.deleteUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

const UserProvider = compose(
  withLoadingNames,
  withAuth,
  withSnackbar,
  withErrors
)(UserProviderCmp);

const withUser = Cmp => props => (
  <UserContext.Consumer>
    {value => <Cmp {...value} {...props} />}
  </UserContext.Consumer>
);

export { UserProvider, withUser };
