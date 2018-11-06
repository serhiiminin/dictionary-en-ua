const DELIMITER_PATH = '/';
const DELIMITER_SEARCH_QUERY = '?';

const parseSearchParams = searchString => Object.assign(
  {},
  ...Array.from(new URLSearchParams(searchString).entries())
    .map(([key, value]) => ({ [key]: value }))
);

const mergeSearchParams = (initialSearchQuery = '', params = {}) =>
  Object.entries(params)
    .reduce((acc, [key, value]) => {
        if (value) {
          acc.set(key, value);
        }
        return acc;
      },
      new URLSearchParams(initialSearchQuery)
    )
    .toString();

const joinUrl = ({ url = '', paths = [], searchParams = {} }) => {
  const updatedUrl = new URL(url);

  updatedUrl.search = mergeSearchParams(updatedUrl.search, searchParams);
  updatedUrl.pathname = [updatedUrl.pathname, ...paths]
  .map(path => path.replace(/\/*$/, ''))
  .join(DELIMITER_PATH);

  return updatedUrl.toString();
};

const joinRoute = ({ pathname = '', search = '', paths = [], searchParams = {} }) => {
  const updatedRoute = [pathname, ...paths]
  .map(path => path.replace(/\/*$/, ''))
  .join(DELIMITER_PATH);
  const updatedSearchParams = mergeSearchParams(search, searchParams);

  return [updatedRoute, updatedSearchParams].join(DELIMITER_SEARCH_QUERY);
};

export {
  parseSearchParams,
  joinUrl,
  joinRoute,
};
