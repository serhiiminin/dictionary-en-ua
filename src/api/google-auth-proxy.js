const createGoogleAuthProxy = fetcher => (params, tokens) =>
  fetcher({
    ...params,
    headers: {
      ...params.headers,
      authorization: tokens.google && `Bearer ${tokens.google.accessToken}`
    }
  }).catch(error => {
    if (error.message === "Forbidden") {
      throw new Error("Unauthorized", error);
    }
  });

export default createGoogleAuthProxy;
