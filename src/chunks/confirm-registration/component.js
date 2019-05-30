import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { CircularProgress } from '@material-ui/core';

class ConfirmRegistration extends Component {
  static propTypes = {
    handleConfirmBasicSignUp: PropTypes.func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  };

  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { location, handleConfirmBasicSignUp } = this.props;
    const token = new URLSearchParams(location.search).get('token');

    handleConfirmBasicSignUp(token).then(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;

    return isLoading ? <CircularProgress /> : 'finish';
  }
}

export default ConfirmRegistration;
