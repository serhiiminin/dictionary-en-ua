import React, { Component } from 'react';
import { InfoBlock } from '../components';
import { withAuth } from '../context/auth';

interface Props {
  removeEmailConfirmation: Function;
}

class CheckSignUp extends Component<Props> {
  public componentWillUnmount(): void {
    this.props.removeEmailConfirmation();
  }

  public render(): JSX.Element {
    return <InfoBlock title="Success" description="Check your email to confirm registration!" />;
  }
}

export default withAuth(CheckSignUp);
