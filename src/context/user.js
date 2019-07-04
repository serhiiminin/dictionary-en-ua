import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { createApiUser } from '../api';
import NT from '../constants/notifications-type';
import LN from '../constants/loading-names';
import { withAuth } from './auth';
import { withFetcher } from './fetcher';

const { Provider, Consumer } = createContext({});

const UserProviderCmp = ({ tokenData, handleFetch, enqueueSnackbar, children }) => {
  const [user, setUser] = useState({});
  const { token } = tokenData || {};
  const apiUser = createApiUser(token);

  const cleanUser = () => setUser({});

  const handleFetchUser = id =>
    handleFetch(LN.user.fetch)(async () => {
      const userData = await apiUser.get(id);
      setUser(userData);
    });

  const handleCreateUser = userData =>
    handleFetch(LN.user.fetch)(async () => {
      const { _id } = await apiUser.create(userData);
      await handleFetchUser(_id);
      enqueueSnackbar('The user has been saved successfully', { variant: NT.success });
    });

  const handleEditUser = userData =>
    handleFetch(LN.user.fetch)(async () => {
      const { _id } = await apiUser.update(userData);
      await handleFetchUser(_id);
      enqueueSnackbar('The user has been updated successfully', { variant: NT.success });
    });

  const handleDeleteUser = id =>
    handleFetch(LN.user.fetch)(async () => {
      await apiUser.delete(id);
      enqueueSnackbar('The user has been deleted successfully', { variant: NT.success });
    });

  return (
    <Provider
      value={{
        user,
        cleanUser,
        handleFetchUser,
        handleCreateUser,
        handleEditUser,
        handleDeleteUser,
      }}
    >
      {children}
    </Provider>
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

const withUser = Cmp => props => <Consumer>{value => <Cmp {...value} {...props} />}</Consumer>;

export { UserProvider, withUser };
