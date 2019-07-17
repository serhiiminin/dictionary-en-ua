import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import LN from '../constants/loading-names';
import { withAuth, AI } from '../context/auth';
import { withLoading, LI } from '../context/loading';
import routes from '../routes';

type Props = RouteComponentProps & LI & AI;

class ConfirmRegistration extends Component<Props> {
  public componentDidMount(): void {
    const { location, history, handleConfirmBasicSignUp } = this.props;
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      history.push(routes.root);
    }
    handleConfirmBasicSignUp(token || '');
  }

  public render(): JSX.Element {
    const { checkIsLoading } = this.props;
    const isLoading = checkIsLoading(LN.auth.confirm);

    return isLoading ? <CircularProgress /> : <div>finish</div>;
  }
}

export default compose<Props, {}>(
  withRouter,
  withLoading,
  withAuth
)(ConfirmRegistration);
