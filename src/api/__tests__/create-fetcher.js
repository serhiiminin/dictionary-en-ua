import createFetcherJson from '../create-fetcher';

describe('fetcher', () => {
  test('Valid data', () => {
    const fetcher = jest.fn(() => Promise.resolve(new Response('')));
    const fetcherJSON = createFetcherJson(fetcher);

    expect.assertions(1);

    return fetcherJSON({ headers: {} }).then(() => {
      const request = fetcher.mock.calls[0][0];

      expect(request.headers).toEqual({});
    });
  });

  test('Forbidden', () => {
    const fetcher = jest.fn(() =>
      Promise.resolve(new Response(new Blob(), { status: 403 }))
    );
    const fetcherJSON = createFetcherJson(fetcher);

    expect.assertions(1);

    return fetcherJSON({ headers: {} }).then(() => {
      const request = fetcher.mock.calls[0][0];

      expect(request.headers).toEqual({});
    });
  });
});
