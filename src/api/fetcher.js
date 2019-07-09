import boom from '@hapi/boom';

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);

  throw boom.boomify(error, { statusCode: response.status });
};

const parseJson = response => response.json();

const createFetcherJson = fetch => params => {
  const { url, body, headers, ...restParams } = params;

  const request = {
    url,
    body: JSON.stringify(body),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      ...headers,
    },
    ...restParams,
  };

  return fetch(request)
    .then(checkStatus)
    .then(parseJson);
};

export default createFetcherJson;
