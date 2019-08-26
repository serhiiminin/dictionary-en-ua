import React, { useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import LN from '../constants/loading-names';
import { withAuth, AI } from '../context/auth';
import { withLoading, LI } from '../context/loading';
import routes from '../routes';

type Props = RouteComponentProps & LI & AI;

const ConfirmRegistration = (props: Props): JSX.Element => {
  const { checkIsLoading, location, history, handleConfirmBasicSignUp } = props;
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

export default compose<Props, {}>(
  withRouter,
  withLoading,
  withAuth
)(ConfirmRegistration);
