import { requests } from './request';

describe('requests', () => {
  const url = 'http://example.com';
  const endpoints = requests(url);

  test('test what function returns', () => {
    expect(endpoints).toEqual({
      addEntity: expect.any(Function),
      deleteEntity: expect.any(Function),
      getEntitiesList: expect.any(Function),
      getEntity: expect.any(Function),
      search: expect.any(Function),
      updateEntity: expect.any(Function),
    })
  });

  test('get entity', () => {
    const id = 'id';

    expect(endpoints.getEntity(id)).toEqual({
      endpoint: `${url}/${id}`,
      method: 'GET'
    })
  });

  test('get entities list', () => {
    expect(endpoints.getEntitiesList()).toEqual({
      endpoint: url,
      method: 'GET'
    })
  });

  test('search entity', () => {
    const body = { en: 'english' };

    expect(endpoints.search(body)).toEqual({
      endpoint: `${url}/_search`,
      method: 'POST',
      body,
    })
  });

  test('add entity', () => {
    const body = { en: 'english' };

    expect(endpoints.addEntity(body)).toEqual({
      endpoint: url,
      method: 'POST',
      body,
    })
  });

  test('update entity', () => {
    const id = 'id';
    const body = { en: 'english' };

    expect(endpoints.updateEntity(id, body)).toEqual({
      endpoint: `${url}/${id}`,
      method: 'PUT',
      body,
    })
  });

  test('update entity', () => {
    const id = 'id';

    expect(endpoints.deleteEntity(id)).toEqual({
      endpoint: `${url}/${id}`,
      method: 'DELETE',
    })
  });

});
