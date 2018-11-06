import getGiphyApiKey from './get-api-keys';

describe('getGiphyApiKey', () => {
  test('pass object with params', () => {
    const PREFIX  = 'APP_KEY';
    const params = {
      'ENV': 'development',
      'APP_KEY_1': '123123',
      'APP_KEY_2': '321321',
    }
    expect(getGiphyApiKey(PREFIX)(params)).toEqual(['123123', '321321']);
  })
});
