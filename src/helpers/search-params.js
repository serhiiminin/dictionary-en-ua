const getSearchParams = url => new URL(url).search;

const parseSearchParams = searchString => {
  const searchParams = new URLSearchParams(searchString);

  return Object.assign(
    {},
    ...Array.from(searchParams.entries())
      .map(([key, value]) => ({ [key]: value }))
  );
};

const mergeSearchParams = (params, initialSearchParams) => {
  const searchParams = new URLSearchParams(initialSearchParams);

  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  return searchParams.toString();
};

const updateSearchParamsInUrl = (url, params) => {
  const updatedUrl = new URL(url);
  const updatedSearchParams = mergeSearchParams(params, updatedUrl.search);

  updatedUrl.search = updatedSearchParams;

  return updatedUrl.toString();
}

export {
  getSearchParams,
  mergeSearchParams,
  parseSearchParams,
  updateSearchParamsInUrl
};
