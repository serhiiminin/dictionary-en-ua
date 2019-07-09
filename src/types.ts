export interface RequestParams {
  url?: string;
  method?: string;
  headers?: object;
  body?: object;
}

export type FetchResult = Promise<object>;

export type Fetcher = (params: RequestParams) => FetchResult;
export type FetcherWithToken = (token: string) => Fetcher;

export type EndpointJoiner = (path: string) => string;

export interface User {
  _id: string;
  name: string;
  imageUrl: string;
  googleId: string;
  facebookId: string;
  email: string;
  active: boolean;
  password: string;
  expires: string;
}

export interface Word {
  _id: string;
  antonyms: string[];
  definitions: string[];
  examples: string[];
  gif: string;
  options: string[];
  partOfSpeech: string[];
  similarTo: string[];
  synonyms: string[];
  transcription: string;
  word: string;
  ownerId: string;
  dateCreated: string;
  dateLastUpdated: string;
  timesLearnt: number;
  dateLastLearnt: string;
}

export interface Token {
  token: string;
  _id: string;
  email: string;
  expiresAt: number;
}
