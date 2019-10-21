import React, { Component, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import NT from '../constants/notifications-type';
import routes from '../routes';
import { getErrorMessage, getErrorType } from '../util/handle-errors';

interface Props {
  children: JSX.Element;
}

interface State {
  hasError: boolean;
}

interface EI {
  handleError(error: Error): void;
}

const ErrorsContext = createContext({} as EI);

class ErrorProvider extends Component<Props, State> {
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
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
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
      <ErrorsContext.Provider value={{ handleError: this.handleError }}>
        {hasError ? <div>Something went wrong</div> : children}
      </ErrorsContext.Provider>
    );
  }
}

export { ErrorProvider, ErrorsContext };
