import requests from '../request';

describe('requests', () => {
  const url = 'http://example.com';
  const params = {
    body: {
      word: 'word',
    }
  };

  test('test what function returns', () => {
    expect(requests)
      .toEqual({
        get: expect.any(Function),
        post: expect.any(Function),
        put: expect.any(Function),
        patch: expect.any(Function),
        delete: expect.any(Function),
      });
  });

  test('get', () => {
    expect(requests.get(url))
      .toEqual({
        endpoint: url,
        method: 'GET'
      });
  });

  test('post', () => {
    expect(requests.post(url, params))
      .toEqual({
        endpoint: url,
        method: 'POST',
        body: params.body,
      });
  });

  test('put', () => {
    expect(requests.put(url, params))
      .toEqual({
        endpoint: url,
        method: 'PUT',
        body: params.body,
      });
  });

  test('patch', () => {
    expect(requests.patch(url, params))
      .toEqual({
        endpoint: url,
        method: 'PATCH',
        body: params.body,
      });
  });

  test('delete', () => {
    expect(requests.delete(url, params))
      .toEqual({
        endpoint: url,
        method: 'DELETE',
        body: params.body,
      });
  });
});
