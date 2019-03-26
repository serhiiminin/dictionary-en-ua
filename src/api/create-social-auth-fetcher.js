const createSocialAuthFetcher = fetch => (params, token) => {
  const { endpoint, body, headers, ...restParams } = params;

  const request = new Request(endpoint, {
    body: JSON.stringify(body),
    headers: new Headers({
      'proxy-authorization': `Bearer ${token}`,
      ...headers,
    }),
    ...restParams,
  });

  return fetch(request);
};

export default createSocialAuthFetcher;
