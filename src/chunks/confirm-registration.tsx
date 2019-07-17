import React, { Component } from 'react';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import LN from '../constants/loading-names';
import { withLoading } from '../context/loading';
import { withAuth } from '../context/auth';
import routes from '../routes';

interface OwnProps {
  checkIsLoading: Function;
  handleConfirmBasicSignUp: Function;
}

type Props = RouteComponentProps & OwnProps;

class ConfirmRegistration extends Component<Props> {
  public componentDidMount(): void {
    const { location, history, handleConfirmBasicSignUp } = this.props;
    const token = new URLSearchParams(location.search).get('token');
    if (!token) {
      history.push(routes.root);
    }
    handleConfirmBasicSignUp(token);
  }

  public render(): JSX.Element {
    const { checkIsLoading } = this.props;
    const isLoading = checkIsLoading(LN.auth.confirm);

    return isLoading ? <CircularProgress /> : <div>finish</div>;
  }
}

export default compose(
  withRouter,
  withLoading,
  withAuth
)(ConfirmRegistration);
