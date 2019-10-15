import React, { createContext, useState, useContext } from 'react';
import { compose } from 'recompose';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { createApiUser } from '../api';
import LN from '../constants/loading-names';
import { AuthContext } from './auth';
import { FetcherContext } from './fetcher';
import { User } from '../types';

export interface UI {
  user: User;
  cleanUser(): void;
  handleFetchUser(id: string): void;
  handleCreateUser(user: User): void;
  handleEditUser(user: User): void;
  handleDeleteUser(user: string): void;
}

const UserContext = createContext({} as UI);

interface OwnProps {
  children: JSX.Element;
}

type Props = WithSnackbarProps & OwnProps;

const UserProviderCmp = ({ enqueueSnackbar, children }: Props): JSX.Element => {
  const { handleFetch } = useContext(FetcherContext);
  const { tokenData } = useContext(AuthContext);
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
    <UserContext.Provider
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
    </UserContext.Provider>
  );
};

const UserProvider = compose<Props, OwnProps>(withSnackbar)(UserProviderCmp);

export { UserProvider, UserContext };
