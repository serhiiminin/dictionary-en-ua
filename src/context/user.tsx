import React, { ComponentType, createContext, useState } from 'react';
import { compose } from 'recompose';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { createApiUser } from '../api';
import LN from '../constants/loading-names';
import { withAuth, AI } from './auth';
import { withFetcher, FI } from './fetcher';
import { User } from '../types';

interface OwnProps {
  children: JSX.Element;
}

type Props = AI & FI & WithSnackbarProps & OwnProps;

const { Provider, Consumer } = createContext({});

const UserProviderCmp = ({ tokenData, handleFetch, enqueueSnackbar, children }: Props): JSX.Element => {
  const [user, setUser] = useState<User>({});
  const { token } = tokenData;
  const apiUser = createApiUser(token);

  const cleanUser = (): void => setUser({});

  const handleFetchUser = (id: string): void => {
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const userData = await apiUser.get<User>(id);
        setUser(userData);
      }
    );
  };

  const handleCreateUser = (userData: User): void => {
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const { _id } = await apiUser.create(userData);
        await handleFetchUser(_id);
        enqueueSnackbar('The user has been saved successfully', { variant: 'success' });
      }
    );
  };

  const handleEditUser = (userData: User): void => {
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const { _id } = await apiUser.update(userData);
        await handleFetchUser(_id);
        enqueueSnackbar('The user has been updated successfully', { variant: 'success' });
      }
    );
  };

  const handleDeleteUser = (id: string): void => {
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        await apiUser.delete(id);
        enqueueSnackbar('The user has been deleted successfully', { variant: 'success' });
      }
    );
  };

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

const UserProvider = compose<Props, OwnProps>(
  withFetcher,
  withAuth,
  withSnackbar
)(UserProviderCmp);

interface UI {
  user: User;
  cleanUser(): void;
  handleFetchUser(id: string): void;
  handleCreateUser(user: User): void;
  handleEditUser(user: User): void;
  handleDeleteUser(user: User): void;
}

const withUser = <T extends {}>(Cmp: ComponentType<T>): ((props: T & UI) => JSX.Element) => (
  props: T & UI
): JSX.Element => <Consumer>{(context: {}): JSX.Element => <Cmp {...context} {...props} />}</Consumer>;

export { UserProvider, withUser };
