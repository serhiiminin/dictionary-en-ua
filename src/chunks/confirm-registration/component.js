import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { CircularProgress } from '@material-ui/core';
import LN from '../../constants/loading-names';
import routes from '../../routes';

const ConfirmRegistration = ({ handleConfirmBasicSignUp, checkIsLoading, location, history }) => {
  const isLoading = checkIsLoading(LN.auth.confirm);

  useEffect(() => {
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      history.push(routes.root);
    }
    handleConfirmBasicSignUp(token);
  }, []);

  return isLoading ? <CircularProgress /> : 'finish';
};

ConfirmRegistration.propTypes = {
  handleConfirmBasicSignUp: PropTypes.func.isRequired,
  checkIsLoading: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default ConfirmRegistration;
