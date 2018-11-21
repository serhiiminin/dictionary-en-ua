const createGoogleAuthProxy = fetcher => (params, googleToken) =>
  fetcher({
    ...params,
    headers: {
      ...params.headers,
      authorization: googleToken && `Bearer ${googleToken.accessToken}`
    }
  }).catch(error => {
    if (error.message === "Forbidden") {
      throw new Error("Unauthorized", error);
    }
  });

export default createGoogleAuthProxy;
