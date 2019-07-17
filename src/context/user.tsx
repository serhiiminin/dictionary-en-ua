import React, { ComponentType, createContext, useState } from 'react';
import { compose } from 'recompose';
import { withSnackbar } from 'notistack';
import { createApiUser } from '../api';
import NT from '../constants/notifications-type';
import LN from '../constants/loading-names';
import { withAuth, AI } from './auth';
import { withFetcher, FI } from './fetcher';
import { User } from '../types';

interface OwnProps {
  children: JSX.Element;
  enqueueSnackbar(n: string, p: object): void;
}

type Props = AI & FI & OwnProps;

const { Provider, Consumer } = createContext({});

const UserProviderCmp = ({ tokenData, handleFetch, enqueueSnackbar, children }: Props): JSX.Element => {
  const [user, setUser] = useState<User>({});
  const { token } = tokenData;
  const apiUser = createApiUser(token);

  const cleanUser = (): void => setUser({});

  const handleFetchUser = (id: string): Promise<object | void> =>
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const userData = await apiUser.get(id);
        setUser(userData);
      }
    );

  const handleCreateUser = (userData: User): Promise<object | void> =>
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const { _id } = await apiUser.create(userData);
        await handleFetchUser(_id);
        enqueueSnackbar('The user has been saved successfully', { variant: NT.success });
      }
    );

  const handleEditUser = (userData: User): Promise<object | void> =>
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const { _id } = await apiUser.update(userData);
        await handleFetchUser(_id);
        enqueueSnackbar('The user has been updated successfully', { variant: NT.success });
      }
    );

  const handleDeleteUser = (id: string): Promise<object | void> =>
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        await apiUser.delete(id);
        enqueueSnackbar('The user has been deleted successfully', { variant: NT.success });
      }
    );

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

const UserProvider = compose<Props, {}>(
  withFetcher,
  withAuth,
  withSnackbar
)(UserProviderCmp);

interface UI {
  user: User;
  cleanUser(): void;
  handleFetchUser(id: string): Promise<object | void>;
  handleCreateUser(user: User): Promise<object | void>;
  handleEditUser(user: User): Promise<object | void>;
  handleDeleteUser(user: User): Promise<object | void>;
}

const withUser = <T extends {}>(Cmp: ComponentType<T>): ((props: T & UI) => JSX.Element) => (
  props: T & UI
): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Consumer>{(context: any): JSX.Element => <Cmp {...context} {...props} />}</Consumer>
);

export { UserProvider, withUser };
