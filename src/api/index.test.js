import { createApiMethods } from ".";

describe("create api methods", () => {
  const body = {
    _id: "123ewfdf23efs",
    en: "day"
  };
  const WORDS = "http://words.com";
  const GIPHY = "http://giphy.com";

  let fetcher;
  let apiMethods;
  beforeAll(() => {
    fetcher = jest.fn(() => Promise.resolve(new Response("")));
    apiMethods = createApiMethods({
      words: WORDS,
      giphy: GIPHY
    })(fetcher);
  });

  test("createWord", () => {
    expect.assertions(1);
    return apiMethods.createWord(body).then(() => {
      const request = fetcher.mock.calls[0][0];

      expect(request.body).toEqual(body);
    });
  });

  test("getWord", () => {
    expect.assertions(1);
    return apiMethods.getWord("1").then(() => {
      const request = fetcher.mock.calls[0][0];

      expect(request.endpoint).toEqual(WORDS);
    });
  });

  test("getWordsList", () => {
    expect.assertions(1);
    return apiMethods.getWordsList(body).then(() => {
      const request = fetcher.mock.calls[0][0];

      expect(request.endpoint).toEqual(WORDS);
    });
  });

  test("getWordsListToLearn", () => {
    expect.assertions(1);
    return apiMethods.getWordsListToLearn().then(() => {
      const request = fetcher.mock.calls[0][0];
      expect(request.endpoint).toEqual(WORDS);
    });
  });
  
  test("updateWord", () => {
    expect.assertions(1);
    return apiMethods.updateWord(body).then(() => {
      const request = fetcher.mock.calls[0][0];
      expect(request.body).toEqual(body);
    });
  });

  test("deleteWord", () => {
    expect.assertions(1);
    return apiMethods.deleteWord('1').then(() => {
      const request = fetcher.mock.calls[0][0];
      expect(request.endpoint).toEqual(WORDS);
    });
  });

  test("learnWord", () => {
    expect.assertions(1);
    return apiMethods.learnWord('1').then(() => {
      const request = fetcher.mock.calls[0][0];
      expect(request.endpoint).toEqual(WORDS);
    });
  });

  test("searchWord", () => {
    expect.assertions(1);
    return apiMethods.searchWord(body).then(() => {
      const request = fetcher.mock.calls[0][0];
      expect(request.body).toEqual(body);
    });
  });

});
