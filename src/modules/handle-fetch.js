const createHandleFetch = ({ startLoading, stopLoading, errorHandler }) => ({
  loadingName,
  apiHandler,
}) =>
  Promise.resolve(startLoading(loadingName))
    .then(() => apiHandler)
    .catch(errorHandler)
    .finally(() => stopLoading(loadingName));

export default createHandleFetch;
