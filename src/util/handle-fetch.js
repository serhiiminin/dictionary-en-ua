const createHandleFetch = ({ startLoading, stopLoading, handleError }) => ({ loadingName, apiHandler }) =>
  Promise.resolve(startLoading(loadingName))
    .then(() => apiHandler)
    .catch(handleError)
    .finally(() => stopLoading(loadingName));

export default createHandleFetch;
