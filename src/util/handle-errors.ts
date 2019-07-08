import NT from '../constants/notifications-type';

interface Notifications {
  success: string;
  warning: string;
  info: string;
  error: {
    clientError: string;
    default: string;
    disconnect: string;
    redirect: string;
    serverError: string;
    unknown: string;
    forbidden: string;
    notFound: string;
  };
}

interface Error {
  message: string;
  response: {
    status: number;
  };
}

type GetType = (error: Error) => string;

const createGetterErrorType = (notifications: Notifications): GetType => (error: Error): string => {
  // eslint-disable-next-line no-console
  console.error(error);

  if (!error) {
    return notifications.error.unknown;
  }

  if (['Failed to fetch', 'Network request failed'].includes(error.message) && !navigator.onLine) {
    return notifications.error.disconnect;
  }

  if (!error.response || !error.response.status) {
    return notifications.error.unknown;
  }

  const errorCode = error.response.status;

  if (errorCode >= 300 && errorCode < 400) {
    return notifications.error.redirect;
  }

  if (errorCode === 403) {
    return notifications.error.forbidden;
  }

  if (errorCode === 404) {
    return notifications.error.notFound;
  }

  if (errorCode >= 400 && errorCode < 500) {
    return notifications.error.clientError;
  }

  if (errorCode >= 500) {
    return notifications.error.serverError;
  }

  return notifications.error.unknown;
};

type GetMessage = (type: string) => string;

const createGetErrorMessages = (notifications: Notifications): GetMessage => (notificationType: string): string =>
  ({
    [notifications.error.clientError]: 'Client error',
    [notifications.error.default]: 'Something went wrong',
    [notifications.error.disconnect]: 'You are disconnected!',
    [notifications.error.forbidden]: 'You are not authorized! Please, use your google account',
    [notifications.error.redirect]: 'You will be redirected',
    [notifications.error.serverError]: 'Server error',
    [notifications.error.notFound]: 'Not found',
    [notifications.error.unknown]: 'Unknown error',
  }[notificationType]);

const getErrorType = createGetterErrorType(NT);
const getErrorMessage = createGetErrorMessages(NT);

export { getErrorType, getErrorMessage };
