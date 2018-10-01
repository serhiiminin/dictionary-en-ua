function* generatorApiKeys(keys) {
  const keysWithLastUsedTime = keys
    .map(apiKey => ({
      key: apiKey,
      lastUsed: null
    }));

  for (let i = 0; i < keysWithLastUsedTime.length; i += 1) {
    const currentKey = keysWithLastUsedTime[i];
    const currentTime = Date.now();

    if (currentTime - currentKey.lastUsed < 500) {
      throw new Error('No free api keys');
    }
    currentKey.lastUsed = currentTime;
    yield currentKey.key;
    if (keysWithLastUsedTime.length - 1 === i) i = -1;
  }
  return false;
}

export default generatorApiKeys;
