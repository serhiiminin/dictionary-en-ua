function* generatorApiKeys(keys) {
  const TIME_KEYS_REPEAT = keys.length * 200;
  const keysWithLastUsedTime = keys.map(apiKey => ({
    key: apiKey,
    lastUsed: null,
  }));

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < keysWithLastUsedTime.length; i++) {
    const currentKey = keysWithLastUsedTime[i];
    const currentTime = Date.now();
    if (currentTime - currentKey.lastUsed < TIME_KEYS_REPEAT) {
      throw new Error('No free api keys');
    }

    currentKey.lastUsed = currentTime;
    yield currentKey.key;

    if (keysWithLastUsedTime.length - 1 === i) i = -1;
  }
}

export default generatorApiKeys;
