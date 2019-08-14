import React, { Component, ComponentType, createContext } from 'react';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import NT from '../constants/notifications-type';
import routes from '../routes';
import { getErrorMessage, getErrorType } from '../util/handle-errors';

const { Provider, Consumer } = createContext({});

interface OwnProps {
  children: JSX.Element;
}

interface State {
  hasError: boolean;
}

type Props = RouteComponentProps & WithSnackbarProps & OwnProps;

class ErrorsProviderCmp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility,@typescript-eslint/explicit-function-return-type
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: object): void {
    // eslint-disable-next-line
    console.log(error, info);
  }

  public handleError = (error: Error): void => {
    const { history, enqueueSnackbar } = this.props;
    if (error.message === NT.error.forbidden) {
      history.push(routes.auth.logIn);
    }
    const errorMessage = getErrorMessage(getErrorType(error));
    enqueueSnackbar(errorMessage, { variant: 'info' });
  };

  public render(): JSX.Element {
    const { children } = this.props;
    const { hasError } = this.state;

    return (
      <Provider value={{ handleError: this.handleError }}>
        {hasError ? <div>Something went wrong</div> : children}
      </Provider>
    );
  }
}

export interface EI {
  handleError(error: Error): void;
}

const ErrorProvider = compose<Props, OwnProps>(
  withRouter,
  withSnackbar
)(ErrorsProviderCmp);

const withErrors = <T extends {}>(Cmp: ComponentType<T>): ((props: T & EI) => JSX.Element) => (
  props: T & EI
): JSX.Element => <Consumer>{(context: {}): JSX.Element => <Cmp {...context} {...props} />}</Consumer>;

export { ErrorProvider, withErrors };
