import notificationsTypes from '../constants/notifications-type';

const createGetterErrorType = notificationsMessages => error => {
  // eslint-disable-next-line no-console
  console.error(error);

  if (!error) {
    return notificationsMessages.error.unknown;
  }

  if (
    ['Failed to fetch', 'Network request failed'].includes(error.message) &&
    !navigator.onLine
  ) {
    return notificationsMessages.error.disconnect;
  }

  if (!error.response || !error.response.status) {
    return notificationsMessages.error.unknown;
  }

  const errorCode = error.response.status;

  if (errorCode >= 300 && errorCode < 400) {
    return notificationsMessages.error.redirect;
  }

  if (errorCode === 403) {
    return notificationsMessages.error.forbidden;
  }

  if (errorCode === 404) {
    return notificationsMessages.error.notFound;
  }

  if (errorCode >= 400 && errorCode < 500) {
    return notificationsMessages.error.clientError;
  }

  if (errorCode >= 500) {
    return notificationsMessages.error.serverError;
  }

  return notificationsMessages.error.unknown;
};

const createGetErrorMessages = notificationType => errorType =>
  ({
    [notificationType.error.clientError]: 'Client error',
    [notificationType.error.default]: 'Something went wrong',
    [notificationType.error.disconnect]: 'You are disconnected!',
    [notificationType.error.forbidden]:
      'You are not authorized! Please, use your google account',
    [notificationType.error.redirect]: 'You will be redirected',
    [notificationType.error.serverError]: 'Server error',
    [notificationType.error.notFound]: 'Not found',
    [notificationType.error.unknown]: 'Unknown error',
  }[errorType.message]);

const getErrorType = createGetterErrorType(notificationsTypes);
const getErrorMessage = createGetErrorMessages(notificationsTypes);

export { getErrorType, getErrorMessage };
