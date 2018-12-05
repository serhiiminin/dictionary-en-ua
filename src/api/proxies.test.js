import { createApiKeyProxy } from "./proxies";

function* generateKey() {
  yield 1;
  yield 2;
  yield 3;
}

describe("fetch api proxy", () => {
  let generator;

  beforeAll(() => {
    generator = generateKey();
  });
  
  test("resolved with passed params", () => {
    const fetcher = jest.fn(() => Promise.resolve(new Response("")));
    const headers = {
      method: "POST"
    };
    const body = {
      _id: "1"
    };
    const params = {
      endpoint: "http://google.com",
      headers,
      body
    };
    expect.assertions(2);

    return createApiKeyProxy(generator)(fetcher)(params).then(() => {
      const request = fetcher.mock.calls[0][0];

      expect(request.headers).toEqual(headers);
      expect(request.body).toEqual(body);
    });
  });

  test("rejected with some error", () => {
    const ERROR_MESSAGE = 'Unauthorized';
    const fetcher = jest.fn(() => Promise.reject(new Error(ERROR_MESSAGE)));
    const params = {
      endpoint: "http://google.com",
      headers: {
        method: 'GET',
      },
    };

    return createApiKeyProxy(generator)(fetcher)(params)
    .catch(error => {
      expect(error.message).toEqual(ERROR_MESSAGE);
    });
  });

  test("rejected with error `failed to fetch`", () => {
    const ERROR_MESSAGE = 'Failed to fetch';
    const fetcher = jest.fn(() => Promise.reject(new Error(ERROR_MESSAGE)));
    const params = {
      endpoint: "http://google.com",
      headers: {
        method: 'GET',
      },
    };

    return createApiKeyProxy(generator)(fetcher)(params)
    .catch(error => {
      expect(error.message).toEqual(ERROR_MESSAGE);
    });
  });
});
