import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { createApiUser } from '../api';
import NT from '../constants/notifications-type';
import LN from '../constants/loading-names';
import { withAuth } from './auth';
import { withFetcher } from './fetcher';

const UserContext = createContext({});

const UserProviderCmp = ({ tokenData, handleFetch, enqueueSnackbar, children }) => {
  const [user, setUser] = useState({});
  const { token } = tokenData || {};
  const apiUser = createApiUser(token);

  const cleanUser = () => setUser({});

  const setUserToState = userData => setUser(userData);

  const fetchUser = id =>
    handleFetch({
      loadingName: LN.user.fetch,
      apiHandler: apiUser.get(id),
    });

  const createUser = userData =>
    handleFetch({
      loadingName: LN.user.fetch,
      apiHandler: apiUser
        .create({ ...userData })
        .then(() => enqueueSnackbar('The user has been saved successfully', { variant: NT.success })),
    });

  const editUser = userData =>
    handleFetch({
      loadingName: LN.user.fetch,
      apiHandler: apiUser
        .update({ ...userData })
        .then(() => enqueueSnackbar('The user has been updated successfully', { variant: NT.success })),
    });

  const deleteUser = id =>
    handleFetch({
      loadingName: LN.user.fetch,
      apiHandler: apiUser
        .delete(id)
        .then(() => enqueueSnackbar('The user has been deleted successfully', { variant: NT.success })),
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
  handleFetch: PropTypes.func.isRequired,
};

UserProviderCmp.defaultProps = {
  tokenData: null,
};

const UserProvider = compose(
  withFetcher,
  withAuth,
  withSnackbar
)(UserProviderCmp);

const withUser = Cmp => props => <UserContext.Consumer>{value => <Cmp {...value} {...props} />}</UserContext.Consumer>;

export { UserProvider, withUser };
