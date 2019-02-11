const NS = 'LOADING';
const WORDS = `${NS}/WORDS`;
const USER = `${NS}/USER`;
const GIF = `${NS}/GIF`;

const loadingNames = {
  words: {
    list: `${WORDS}/list`,
    save: `${WORDS}/save`,
    fetch: `${WORDS}/fetch`,
    learn: `${WORDS}/learn`,
    search: `${WORDS}/search`,
    delete: `${WORDS}/delete`,
  },
  user: {
    fetch: `${USER}/fetch`,
  },
  gif: {
    fetch: `${GIF}/fetch`,
  },
};

export default loadingNames;
