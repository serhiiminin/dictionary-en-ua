import generatorApiKeys from "./generator-api-key";

describe("generatorApiKeys", () => {
  const keys = ["key1", "key2"];
  let generator;
  beforeEach(() => {
    generator = generatorApiKeys(keys);
  });
  test("get the first key", () => {
    expect(generator.next()).toEqual({
      done: false,
      value: "key1"
    });
  });

  test("get first key when the last key is used", () => {
    generator.next();
    generator.next();
    setTimeout(() => {
      expect(generator.next()).toEqual({
        done: false,
        value: "key1"
      });
    }, 500);
  });

  test("call generator too often", () => {
    expect(() => {
      generator.next();
      generator.next();
      generator.next();
      generator.next();
    }).toThrowError("No free api keys");
  });
});
