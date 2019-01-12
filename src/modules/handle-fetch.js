const createHandleFetch = ({ startLoading, stopLoading, errorHandler }) => ({
  loadingName,
  requestHandler,
  responseHandler,
  googleToken
}) =>
  Promise.resolve(startLoading(loadingName))
    .then(() => requestHandler(googleToken) || (r => r))
    .then(responseHandler || (r => r))
    .catch(errorHandler)
    .finally(() => stopLoading(loadingName));

export default createHandleFetch;
