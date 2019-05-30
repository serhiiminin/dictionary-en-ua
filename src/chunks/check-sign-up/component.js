import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfoBlock } from '../../components';

class CheckSignUp extends Component {
  static propTypes = {
    removeEmailConfirmation: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.props.removeEmailConfirmation();
  }

  render() {
    return <InfoBlock title="Success" description="Check your email to confirm registration!" />;
  }
}

export default CheckSignUp;
