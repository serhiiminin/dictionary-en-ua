const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  error.response = response;
  throw error;
};

const parseJson = response => response.json();

const createFetcherJson = fetcher =>
  params => {
    const { endpoint, body, headers, ...restParams } = params;

    const request = new Request(
      endpoint,
      {
        body: JSON.stringify(body),
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...headers,
        }),
        ...restParams,
      },
    );

    return fetcher(request)
      .then(checkStatus)
      .then(parseJson)
      .catch(error => {
        console.log(error, error.status); // eslint-disable-line no-console
        if (error.message === 'Failed to fetch' && !window.navigator.onLine) {
          throw new Error('Check your internet connection');
        }
        throw new Error(error);
      });
  };

export { createFetcherJson };
