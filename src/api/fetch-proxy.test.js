import { fetchProxy } from './fetch-proxy';

describe('fetch proxy', () => {
  test('Valid data', () => {
    const fetcher = jest.fn(() => Promise.resolve(new Response('')));
    const fetcherJSON = fetchProxy(fetcher);

    expect.assertions(1);

    return fetcherJSON({ headers: {} })
      .then(() => {
        const request = fetcher.mock.calls[0][0];

        expect(request.headers).toEqual({});
      })
  });

  test('Forbidden', () => {
    const fetcher = jest.fn(() => Promise.resolve(new Response(new Blob(), { status: 403 })));
    const fetcherJSON = fetchProxy(fetcher);

    expect.assertions(1);

    return fetcherJSON({ headers: {} })
      .then(() => {
        const request = fetcher.mock.calls[0][0];

        expect(request.headers).toEqual({});
      })
  });
});
