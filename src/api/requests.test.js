import requests from './request';

describe('requests', () => {
  const url = 'http://example.com';
  const endpoints = requests(url);

  test('test what function returns', () => {
    expect(endpoints).toEqual({
      addEntity: expect.any(Function),
      deleteEntity: expect.any(Function),
      getEntitiesList: expect.any(Function),
      getEntitiesListToLearn: expect.any(Function),
      getEntity: expect.any(Function),
      search: expect.any(Function),
      updateEntity: expect.any(Function),
      learnEntity: expect.any(Function),
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

  test('get entities list to learn', () => {
    expect(endpoints.getEntitiesListToLearn()).toEqual({
      endpoint: `${url}/list-learn`,
      method: 'GET'
    })
  });

  test('learn entity', () => {
    const id = 'id';

    expect(endpoints.learnEntity(id)).toEqual({
      endpoint: `${url}/${id}/_learn`,
      method: 'PUT',
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
