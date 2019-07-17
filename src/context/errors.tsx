import React, { Component, ComponentType, createContext } from 'react';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import NT from '../constants/notifications-type';
import routes from '../routes';
import { getErrorMessage, getErrorType } from '../util/handle-errors';

const { Provider, Consumer } = createContext({});

interface OwnProps {
  children: JSX.Element;
  enqueueSnackbar(m: string, p: object): void;
}

type Props = RouteComponentProps & OwnProps;

class ErrorsProviderCmp extends Component<Props> {
  public handleError = (error: Error): void => {
    const { history, enqueueSnackbar } = this.props;
    if (error.message === NT.error.forbidden) {
      history.push(routes.auth.logIn);
    }
    const errorMessage = getErrorMessage(getErrorType(error));
    enqueueSnackbar(errorMessage, { variant: NT.info });
  };

  public componentDidCatch(error: Error, info: object): void {
    // eslint-disable-next-line
    console.log(error, info);
  }

  public render(): JSX.Element {
    const { children } = this.props;

    return <Provider value={{ handleError: this.handleError }}>{children}</Provider>;
  }
}

export interface EI {
  handleError(error: Error): void;
}

const ErrorProvider = compose<Props, {}>(
  withRouter,
  withSnackbar
)(ErrorsProviderCmp);

const withErrors = <T extends {}>(Cmp: ComponentType<T>): ((props: T & EI) => JSX.Element) => (
  props: T & EI
): JSX.Element => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Consumer>{(context: any): JSX.Element => <Cmp {...context} {...props} />}</Consumer>
);

export { ErrorProvider, withErrors };
