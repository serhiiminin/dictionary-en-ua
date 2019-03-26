const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  error.response = response;
  throw error;
};

const parseJson = response => response.json();

const createFetcherJson = fetch => params => {
  const { endpoint, body, headers, ...restParams } = params;

  const request = new Request(endpoint, {
    body: JSON.stringify(body),
    headers: new Headers({
      accept: 'application/json',
      'content-type': 'application/json',
      ...headers,
    }),
    ...restParams,
  });

  return fetch(request)
    .then(checkStatus)
    .then(parseJson);
};

export default createFetcherJson;
