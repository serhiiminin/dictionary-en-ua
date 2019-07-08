type FN = (params: object) => string[];

const getGiphyApiKey = (apiKeyPrefix: string): FN => (params: object): string[] =>
  Object.entries(params)
    .filter(([key]: string[]): boolean => key.startsWith(apiKeyPrefix))
    .map((key: string[]): string => key[1]);

export default getGiphyApiKey;
