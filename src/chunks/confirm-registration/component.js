import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { CircularProgress } from '@material-ui/core';
import LN from '../../constants/loading-names';
import routes from '../../routes';

class ConfirmRegistration extends Component {
  static propTypes = {
    handleConfirmBasicSignUp: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  };

  componentDidMount() {
    const { location, history, handleConfirmBasicSignUp } = this.props;
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      history.push(routes.root);
    }
    handleConfirmBasicSignUp(token);
  }

  render() {
    const { checkIsLoading } = this.props;
    const isLoading = checkIsLoading(LN.auth.confirm);

    return isLoading ? <CircularProgress /> : 'finish';
  }
}

export default ConfirmRegistration;
