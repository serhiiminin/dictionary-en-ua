import { GIPHY_API_KEYS } from '../api/credentials';

const TIME_KEYS_REPEAT = GIPHY_API_KEYS.length * 200;

function* generatorApiKeys(keys) {
  const keysWithLastUsedTime = keys
    .map(apiKey => ({ key: apiKey, lastUsed: null }));

  for (let i = 0; i < keysWithLastUsedTime.length; i += 1) {
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
