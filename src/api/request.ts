interface Requests {
  create<T>(body: object): Promise<T>;
  get<T>(id: string): Promise<T>;
  getList<T>(body: object): Promise<T>;
  update<T>(body: T): Promise<T>;
  delete<T>(id: string): Promise<T>;
  search<T>(params: object): Promise<T>;
}

const createRequests = (endpoint: string, fetcher: Function): Requests => ({
  get: <T>(id: string): Promise<T> =>
    fetcher({
      endpoint: `${endpoint}/${id}`,
      method: 'GET',
    }),
  create: <T>(entity: object): Promise<T> =>
    fetcher({
      endpoint: `${endpoint}/new`,
      method: 'POST',
      body: entity,
    }),
  update: <T>(entity: T): Promise<T> =>
    fetcher({
      endpoint: `${endpoint}/${entity._id}`,
      method: 'PUT',
      body: entity,
    }),
  delete: <T>(id: string): Promise<T> =>
    fetcher({
      endpoint: `${endpoint}/${id}`,
      method: 'DELETE',
    }),
  getList: <T>(params: object): Promise<T> =>
    fetcher({
      endpoint: `${endpoint}/list`,
      method: 'POST',
      body: params,
    }),
  search: <T>(params: object): Promise<T> =>
    fetcher({
      endpoint: `${endpoint}/search`,
      method: 'POST',
      body: params,
    }),
});

export default createRequests;
