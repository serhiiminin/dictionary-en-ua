const {
  PUBLIC_URL = '/',
  REACT_APP_API_ENDPOINT = '',
  REACT_APP_ENDPOINT_GIPHY = '',
  REACT_APP_GOOGLE_API_KEY = '',
  REACT_APP_GOOGLE_CLIENT_ID = '',
  REACT_APP_GOOGLE_CLIENT_SECRET = '',
  REACT_APP_GOOGLE_CSE_ID = '',
  REACT_APP_FACEBOOK_APP_ID = '',
  REACT_APP_FACEBOOK_APP_SECRET = '',
  REACT_APP_FACEBOOK_CALLBACK_URL = '',
  REACT_APP_GIPHY_API_KEYS_00 = '',
  REACT_APP_GIPHY_API_KEYS_01 = '',
  REACT_APP_GIPHY_API_KEYS_02 = '',
  REACT_APP_GIPHY_API_KEYS_03 = '',
  REACT_APP_GIPHY_API_KEYS_04 = '',
  REACT_APP_GIPHY_API_KEYS_05 = '',
  REACT_APP_GIPHY_API_KEYS_06 = '',
  REACT_APP_GIPHY_API_KEYS_07 = '',
  REACT_APP_GIPHY_API_KEYS_08 = '',
  REACT_APP_GIPHY_API_KEYS_09 = '',
} = process.env;

const AUTH = `${REACT_APP_API_ENDPOINT}/auth`;
const AUTH_BASIC = `${AUTH}/basic`;
const AUTH_FACEBOOK = `${AUTH}/facebook`;
const AUTH_GOOGLE = `${AUTH}/google`;
const USERS = `${REACT_APP_API_ENDPOINT}/users`;
const WORDS = `${REACT_APP_API_ENDPOINT}/words`;

const config = {
  publicUrl: PUBLIC_URL,
  auth: {
    google: {
      apiKey: REACT_APP_GOOGLE_API_KEY,
      clientId: REACT_APP_GOOGLE_CLIENT_ID,
      clientSecret: REACT_APP_GOOGLE_CLIENT_SECRET,
      cseId: REACT_APP_GOOGLE_CSE_ID,
    },
    facebook: {
      appId: REACT_APP_FACEBOOK_APP_ID,
      appSecret: REACT_APP_FACEBOOK_APP_SECRET,
      callbackUrl: REACT_APP_FACEBOOK_CALLBACK_URL,
    },
    giphy: {
      apiKeys: [
        REACT_APP_GIPHY_API_KEYS_00,
        REACT_APP_GIPHY_API_KEYS_01,
        REACT_APP_GIPHY_API_KEYS_02,
        REACT_APP_GIPHY_API_KEYS_03,
        REACT_APP_GIPHY_API_KEYS_04,
        REACT_APP_GIPHY_API_KEYS_05,
        REACT_APP_GIPHY_API_KEYS_06,
        REACT_APP_GIPHY_API_KEYS_07,
        REACT_APP_GIPHY_API_KEYS_08,
        REACT_APP_GIPHY_API_KEYS_09,
      ],
    },
  },
  endpoints: {
    api: {
      auth: {
        basic: AUTH_BASIC,
        google: AUTH_GOOGLE,
        facebook: AUTH_FACEBOOK,
      },
      users: USERS,
      words: WORDS,
    },
    giphy: REACT_APP_ENDPOINT_GIPHY,
  },
};

export default config;
