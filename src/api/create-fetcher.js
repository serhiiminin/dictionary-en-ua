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
  };

export default createFetcherJson;
