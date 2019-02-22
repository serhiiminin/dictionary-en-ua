const createHandleFetch = ({ startLoading, stopLoading, errorHandler }) => ({
  loadingName,
  requestHandler,
  responseHandler,
  token,
}) =>
  Promise.resolve(startLoading(loadingName))
    .then(() => requestHandler(token) || (r => r))
    .then(responseHandler || (r => r))
    .catch(errorHandler)
    .finally(() => stopLoading(loadingName));

export default createHandleFetch;
