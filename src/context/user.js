import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { apiUser } from '../api';
import notificationType from '../constants/notifications-type';
import loadingNames from '../constants/loading-names';
import { withAuth } from './auth';
import { withLoadingNames } from './loading-names';
import createHandleFetch from '../util/handle-fetch';
import { withErrors } from './errors';

const UserContext = createContext({});

const UserProviderCmp = ({ startLoading, stopLoading, tokenData, handleError, enqueueSnackbar, children }) => {
  const [user, setUser] = useState({});

  const handleFetch = createHandleFetch({ startLoading, stopLoading, handleError });

  const cleanUser = () => setUser({});

  const setUserToState = userData => setUser(userData);

  const fetchUser = id =>
    handleFetch({
      loadingName: loadingNames.user.fetch,
      apiHandler: apiUser.get(id, tokenData.token),
    });

  const createUser = userData =>
    handleFetch({
      loadingName: loadingNames.user.fetch,
      apiHandler: apiUser
        .create({ ...userData }, tokenData && tokenData.token)
        .then(() => enqueueSnackbar('The user has been saved successfully', { variant: notificationType.success })),
    });

  const editUser = userData =>
    handleFetch({
      loadingName: loadingNames.user.fetch,
      apiHandler: apiUser
        .update({ ...userData }, tokenData && tokenData.token)
        .then(() => enqueueSnackbar('The user has been updated successfully', { variant: notificationType.success })),
    });

  const deleteUser = id =>
    handleFetch({
      loadingName: loadingNames.user.fetch,
      apiHandler: apiUser
        .delete(id, tokenData && tokenData.token)
        .then(() => enqueueSnackbar('The user has been deleted successfully', { variant: notificationType.success })),
    });

  return (
    <UserContext.Provider
      value={{
        user,
        setUserToState,
        cleanUser,
        fetchUser,
        createUser,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProviderCmp.propTypes = {
  children: PropTypes.node.isRequired,
  tokenData: PropTypes.shape({}),
  enqueueSnackbar: PropTypes.func.isRequired,
  startLoading: PropTypes.func.isRequired,
  stopLoading: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};

UserProviderCmp.defaultProps = {
  tokenData: null,
};

const UserProvider = compose(
  withLoadingNames,
  withAuth,
  withSnackbar,
  withErrors
)(UserProviderCmp);

const withUser = Cmp => props => <UserContext.Consumer>{value => <Cmp {...value} {...props} />}</UserContext.Consumer>;

export { UserProvider, withUser };
