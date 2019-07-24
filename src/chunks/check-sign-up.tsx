import React, { Component } from 'react';
import { InfoBlock } from '../components';
import { withAuth, AI } from '../context/auth';

class CheckSignUp extends Component<AI> {
  public componentWillUnmount(): void {
    this.props.removeEmailConfirmation();
  }

  public render(): JSX.Element {
    return <InfoBlock title="Success" description="Check your email to confirm registration!" />;
  }
}

export default withAuth(CheckSignUp);
