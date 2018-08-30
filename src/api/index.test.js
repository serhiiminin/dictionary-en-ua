import { api } from '.';

describe('api', () => {
  test('getWord', () => {

    expect.assertions(1);
    return api.getWord();
  });
});
