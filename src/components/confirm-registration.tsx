import React, { useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import LN from '../constants/loading-names';
import { AuthContext } from '../context/auth';
import { LoadingContext } from '../context/loading';
import routes from '../routes';

const ConfirmRegistration = (): JSX.Element => {
  const location = useLocation();
  const history = useHistory();
  const { handleConfirmBasicSignUp } = useContext(AuthContext);
  const { checkIsLoading } = useContext(LoadingContext);
  const isLoading = checkIsLoading(LN.auth.confirm);

  useEffect((): void => {
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      history.push(routes.root);
    }
    handleConfirmBasicSignUp(token || '');
  }, []);

  return isLoading ? <CircularProgress /> : <div>finish</div>;
};

export default ConfirmRegistration;
