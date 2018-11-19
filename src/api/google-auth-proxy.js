import requests from "./request";

const CHECK_TOKEN_URL = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";

const getCheckTokenUrl = (url, token) => `${url}${token}`;

const createGoogleAuthProxy = fetcher => (params, tokens) => 
  fetcher(requests.get(getCheckTokenUrl(CHECK_TOKEN_URL, tokens.google.accessToken)))
    .catch(error => {
      throw new Error('Unauthorized', error);
    })
    .then(() => fetcher({
      ...params,
      headers: {
        ...params.headers,
        authorization: `Bearer ${tokens.google.accessToken}`
      }
    }))

export default createGoogleAuthProxy;
