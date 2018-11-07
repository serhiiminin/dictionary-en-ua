const getGiphyApiKey = apiKeyPrefix => params =>
  Object.entries(params)
    .filter(([key]) => key.startsWith(apiKeyPrefix))
    .map(key => key[1]);

export default getGiphyApiKey;
