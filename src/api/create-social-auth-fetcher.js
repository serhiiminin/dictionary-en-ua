const createSocialAuthFetcher = fetch => (params, token) => {
  const { headers = {} } = params;

  return fetch({
    ...params,
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  });
};

export default createSocialAuthFetcher;
