import React, { createContext, useState, useContext, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { createApiUser } from '../api';
import LN from '../constants/loading-names';
import { AuthContext } from './auth';
import { FetcherContext } from './fetcher';
import { User } from '../types';

interface UI {
  user: User;
  cleanUser(): void;
  handleFetchUser(id: string): void;
  handleCreateUser(user: User): void;
  handleEditUser(user: User): void;
  handleDeleteUser(user: string): void;
}

const UserContext = createContext({} as UI);

interface Props {
  children: JSX.Element;
}

const UserProvider = ({ children }: Props): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const { handleFetch } = useContext(FetcherContext);
  const { tokenData } = useContext(AuthContext);
  const [user, setUser] = useState<User>({} as User);
  const { token } = tokenData;
  const apiUser = createApiUser(token);

  const cleanUser = (): void => setUser({} as User);

  const handleFetchUser = useCallback((id: string): void => {
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const userData = await apiUser.get(id);
        setUser(userData);
      }
    );
  }, []);

  const handleCreateUser = useCallback((userData: User): void => {
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const { _id } = await apiUser.create(userData);
        await handleFetchUser(_id);
        enqueueSnackbar('The user has been saved successfully', { variant: 'success' });
      }
    );
  }, []);

  const handleEditUser = useCallback((userData: User): void => {
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        const { _id } = await apiUser.update(userData);
        await handleFetchUser(_id);
        enqueueSnackbar('The user has been updated successfully', { variant: 'success' });
      }
    );
  }, []);

  const handleDeleteUser = useCallback((id: string): void => {
    handleFetch(LN.user.fetch)(
      async (): Promise<void> => {
        await apiUser.delete(id);
        enqueueSnackbar('The user has been deleted successfully', { variant: 'success' });
      }
    );
  }, []);

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

export { UserProvider, UserContext };
